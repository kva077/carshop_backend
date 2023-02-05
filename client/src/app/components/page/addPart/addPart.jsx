import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPart, loadPartsList } from "../../../store/parts";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import { validator } from "../../../utils/validator";

const AddPart = () => {
    const dispatch = useDispatch();
    const newId = useSelector(loadPartsList()).length;
    const [data, setData] = useState({
        name: "",
        manufacturer: "",
        article: "",
        description: "",
        image: "",
        price: "",
        stock: true
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Название обязательно для заполнения"
            },
            min: {
                message: "Название должно состоять минимум из 3 символов",
                value: 3
            }
        },
        manufacturer: {
            isRequired: {
                message: "Необходимо указать производителя"
            }
        },
        acticle: {
            isRequired: {
                message: "Артикул обязателен для заполнения"
            }
        },
        description: {
            isRequired: {
                message: "Описание обязателен для заполнения"
            },

            min: {
                message: "Описание должно состоять минимум из 3 символов",
                value: 3
            }
        },
        image: {
            isRequired: {
                message: "Обязательно укажите ссылку на изображение товара"
            }
        },
        price: {
            isRequired: {
                message: "Укажите стоимость товара"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            id: newId
        };
        dispatch(createPart(newData));
    };
    return (
        <>
            <h1>Добавление продукта</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Наименование"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                    <TextField
                        label="Производитель"
                        name="manufacturer"
                        value={data.manufacturer}
                        onChange={handleChange}
                        error={errors.manufacturer}
                    />
                    <TextField
                        label="Артикул"
                        name="article"
                        value={data.article}
                        onChange={handleChange}
                        error={errors.article}
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                    <TextField
                        label="Ссылка на изображение"
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                        error={errors.image}
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        error={errors.price}
                    />
                    <RadioField
                        options={[
                            { name: "В наличии", value: true },
                            { name: "Под заказ", value: false }
                        ]}
                        value={data.stock}
                        name="stock"
                        onChange={handleChange}
                        label="Укажите наличие"
                    />
                    <button
                        className="btn btn-primary w-100 mx-auto"
                        type="submit"
                        disabled={!isValid}
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddPart;
