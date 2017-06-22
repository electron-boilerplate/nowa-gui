import React, { PropTypes, Component } from 'react';
import { connect } from 'dva';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Switch from 'antd/lib/switch';
import Checkbox from 'antd/lib/checkbox';


import i18n from 'i18n-renderer-nowa';
import { NAME_MATCH } from 'const-renderer-nowa';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  labelCol: { span: 6, offset: 1 },
  wrapperCol: { span: 15 }
};

/*class PluginPromtsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    
  }
}*/




const PluginPromtsModal = ({
  form: {
    getFieldDecorator,
    validateFields,
    setFieldsValue,
  },
  lang,
  dispatch,
  promts,
}) => {
  const handleCancle = () => {
    dispatch({
      type: 'plugin/changeStatus',
      payload: { showPromtsModal: false }
    });
  };

  const handleOk = () => {
    validateFields((err, answers) => {
      if (!err) {
        console.log(answers);
        
        dispatch({
          type: 'plugin/execPluginTask',
          payload: { answers }
        });
        handleCancle();
      }
    });
  };


  const inputTemp = (obj) =>  {
    const rules = [{ required: true, message: i18n('msg.required') }];

    if (obj.validator) {
      const validator = (rule, value, callback) => {
        if (!obj.validator.func(value)) {
          callback(obj.validator.msg);
        }
        callback();
      };
      rules.push({ validator });
    }

    const options = {
      rules,
    };

    if (obj.default) {
      options.initialValue = obj.default;
    }

    return (
      <FormItem
        key={obj.key}
        {...formItemLayout}
        label={obj.label[lang]}
        required
      >
        {getFieldDecorator(obj.key, options)(<Input />)}
      </FormItem>
    );
  };

  const selectTemp = (obj) =>  {
    let options = {};
    if (obj.default) {
      options.initialValue = obj.default;
    }

    return (
      <FormItem
        key={obj.key}
        {...formItemLayout}
        label={obj.label[lang]}
        required
      >
        {getFieldDecorator(obj.key, options)(
          <Select>
            {
              obj.values.map(item =>
                <Select.Option key={item} value={item}>{item}</Select.Option>
              )
            }
          </Select>
        )}
      </FormItem>
    );
  };

  const switchTemp = (obj) =>  {
    let options = { valuePropName: 'checked' };
    if (obj.default) {
      options.initialValue = obj.default;
    }

    return (
      <FormItem
        key={obj.key}
        {...formItemLayout}
        label={obj.label[lang]}
        required
      >
        {getFieldDecorator(obj.key, options)(<Switch size="small" />)}
      </FormItem>
    );
  };

  const checkboxTemp = (obj) =>  {
    let options = {};
    if (obj.default) {
      options.initialValue = obj.default;
    }

    const opt = obj.values.map(item => ({ label: item, value: item }));

    return (
      <FormItem
        key={obj.key}
        {...formItemLayout}
        label={obj.label[lang]}
        required
      >
        {getFieldDecorator(obj.key, options)(
          <CheckboxGroup options={opt} />
        )}
      </FormItem>
    );
  };

  return (
    <Modal
      title={i18n('plugin.promts.title')}
      visible={true}
      onOk={handleOk}
      onCancel={handleCancle}
      okText={i18n('form.ok')}
      cancelText={i18n('form.cancel')}
    >
      <Form style={{ marginTop: 20 }}>
        {
          promts.length && 
          promts.map(item => {
            let html;
            switch (item.type) {
              case 'input':
                html = inputTemp(item);
                break;
              case 'select':
                html = selectTemp(item);
                break;
              case 'checkbox':
                html = checkboxTemp(item);
                break;
              case 'switch':
                html = switchTemp(item);
                break;
              default:
                html = <div key={item.key} />;
                break;
            }
            return html;
          })
        }
      </Form>
    </Modal>
  );
};



PluginPromtsModal.propTypes = {
  // showModal: PropTypes.bool.isRequired,
  // onHideModal: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    setFieldsValue: PropTypes.func,
    validateFields: PropTypes.func,
  }).isRequired,
  // data: PropTypes.shape({
  //   file: PropTypes.object,
  //   name: PropTypes.string,
  // }).isRequired,
  dispatch: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  promts: PropTypes.arrayOf(PropTypes.object).isRequired,
  // projPath: PropTypes.string.isRequired,
};

export default Form.create()(connect(({ plugin, setting }) => ({
  lang: setting.lang,
  plugins: plugin.UIPluginList,
  promts: plugin.pluginPromts,
}))(PluginPromtsModal));
