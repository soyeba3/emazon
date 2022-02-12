import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser] = useContext(userContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={loggedInUser.name} name='name' placeholder='Enter Your Full Name' {...register("nameRequired", { required: true })} />
      {errors.exampleRequired && <span className='error'>Name is required</span>}
      <input defaultValue={loggedInUser.email} name='email' placeholder='Enter Your e-mail' {...register("emailRequired", { required: true })} />
      {errors.exampleRequired && <span className='error'>Email is required</span>}
      <input name='Address' placeholder='Enter Your Address' {...register("Address", { required: true })} />
      {errors.exampleRequired && <span className='error'>Address is required</span>}
      <input name='phone' placeholder='Enter Your Phone Number' {...register("phoneRequired", { required: true })} />
      {errors.exampleRequired && <span className='error'>phone is required</span>}
      <input type="submit" />
    </form>
  );

};

export default Shipment;