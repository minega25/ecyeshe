import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Image from "next/image";

import { ButtonSearch } from "src/components/Button";
import SearchLocationBox from "src/components/Searchbox";
import ServiceSearch from "src/components/ServiceSearch";

const Form = styled.form`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
`

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  service: string;
}

function SearchForm() {
  const [submitting, setSubmitting] = useState(false);  
  const { register, handleSubmit, setValue, watch } = useForm<
    IFormData
  >({ defaultValues: {} });

  useEffect(() => {
    register("address", { required: "Please enter your address" });
    register("latitude", { required: true, min: -90, max: 90 });
    register("longitude", { required: true, min: -180, max: 180 });
    register("service");
  }, [register]);

  const handleCreate = async (data: IFormData) => {};

  const onSubmit = (data: IFormData) => {
    setSubmitting(false);
    handleCreate(data);
  };

  const address = watch("address");
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

    <ServiceSearch />

    <SearchLocationBox onSelectAddress={(address, latitude, longitude) => {
      setValue("address", address || "");
      setValue("latitude", latitude || 0);
      setValue("longitude", longitude || 0);
    } }
      defaultValue="" />

    <ButtonSearch href="/search"><Image src="/search.svg" height={30} width={30} alt="" /></ButtonSearch>

  </Form>
  );
}

export default SearchForm;
