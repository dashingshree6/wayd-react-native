import { View, Text } from 'react-native'
import React from 'react'

const AddCoupon = () => {


  const [values, setValues] = useState({
    code: '',
    description: '',
    discount: '',
    order_limit: '',
    status: '',
    loading: false,
    error: "",
    getaRedirect: false,
    formData: new FormData()
});

const {
    code,
    description,
    discount,
    order_limit,
    formData
} = values;

const onSubmit = event => {
    event.preventDefault();
    if (isValid()) {
        setValues({ ...values, error: "", loading: true });
        createCoupon(formData)
            .then(data => {
                console.log(formData);
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    props.onSuccessClose();
                    toast.success("Coupon Created Successfully", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    props.onReload();
                    setValues({
                        ...values,
                        code: '',
                        description: '',
                        discount: '',
                        order_limit: '',
                        status: '',
                        loading: false,


                    });
                }
            })
            .catch(err => console.log(err));
    }
};

const handleChange = code => event => {
    const value = event.target.value;
    setValues({
        ...values,
        [code]: value
    });
    formData.set(code, value);
};

const onClose = () => {
    props.onSuccessClose()
}
const isValid = () => {
    if (
        !code.length > 0 &&
        !description.length > 0 &&
        !discount > 0 &&
        !order_limit.length > 0
    ) {
        toast.error("All Fields Are Mandatory", {
            position: toast.POSITION.TOP_RIGHT
        });
        console.log("all fields are mandatory");
        return false;
    } else if (!code.length > 0) {
        toast.error("Coupon Code Required", { position: toast.POSITION.TOP_RIGHT });
        return false;
    } else if (!description.length > 0) {
        toast.error("description required", {
            position: toast.POSITION.TOP_RIGHT
        });
        return false;
    } else if (!discount > 0) {
        toast.error("Discount Required", { position: toast.POSITION.TOP_RIGHT });
        return false;
    } else if (!order_limit > 0) {
        toast.error("order Limit required", { position: toast.POSITION.TOP_RIGHT });
        return false;
    }
    return true;
};

  return (
    <View>
      <Text>AddCoupon</Text>
    </View>
  )
}

export default AddCoupon