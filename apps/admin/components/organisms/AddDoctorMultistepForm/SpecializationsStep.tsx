import { Field, FieldArray, useFormikContext } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { GetSpecializations } from "../../../graphql/query/getSpecs/__generated__/GetSpecializations";
import { GET_SPECIALIZATIONS } from "../../../graphql/query/getSpecs";
import { RegisterDoctorFormSchema } from "./formConfig/initialValues";
import { useEffect, useState } from "react";
import {
    RegisterDoctor,
    RegisterDoctorVariables,
} from "../../../graphql/mutation/registerDoctor/__generated__/RegisterDoctor";
import { REGISTER_DOCTOR_MUTATION } from "../../../graphql/mutation/registerDoctor";
import { EDIT_DOCTOR_MUTATION } from "../../../graphql/mutation/editDoctor";
import { EditDoctor } from "@graphqlTypes/EditDoctor";
import {
    EditDoctorMutationVariables,
    MutationAttachDoctorToSpecializationArgs,
} from "../../../../../packages/shared-gql";
import {
    ATTACH_DOCTOR_TO_SPECIALIZATION,
    DETACH_DOCTOR_FROM_SPECIALIZATION,
} from "../../../graphql/mutation/attachDoctorToSpecialization";
import { GET_DOCTOR_BY_ID } from "graphql/query";

export const SpecializationsStep = ({ doctorData, onNext, onPrev, onAdd }) => {
    const { values, setFieldValue } = useFormikContext();
    const [
        attachDoctorToSpecializationFunction,
        { data: attachDoctorToSpecializationData, loading, error },
    ] = useMutation(ATTACH_DOCTOR_TO_SPECIALIZATION, {
        onCompleted: (data) => {
            alert("Специализация добавлена!");
        },
        refetchQueries: [GET_DOCTOR_BY_ID],
    });

    const [
        dettachDoctorToSpecializationFunction,
        { data: dettachDoctorToSpecializationData, loading: loadingDetach },
    ] = useMutation(DETACH_DOCTOR_FROM_SPECIALIZATION, {
        onCompleted: (data) => {
            alert("Специализация удалена!");
        },
        refetchQueries: [GET_DOCTOR_BY_ID],
    });

    useEffect(() => {
        if (doctorData) {
            setDoctorSpecializations(doctorData.specializations);
        }
    }, [doctorData]);

    const { data } = useQuery<GetSpecializations>(GET_SPECIALIZATIONS);
    const specializationsRes = data?.getSpecializations ?? [];

    const [selectedSpecificationId, setSelectedSpecificationId] = useState("");
    const [doctorSpecializations, setDoctorSpecializations] = useState([]);
    const specializations = specializationsRes
        .map((el) => el)
        .sort((a, b) => a.name.localeCompare(b.name, "ru"));

    const services = specializations
        .filter((el) =>
            doctorData.specializations.map((item) => item._id).includes(el._id),
        )
        .map((el) => el.services)
        .flat(1)
        .sort((a, b) => a.name.localeCompare(b.name, "ru"));

    const defaultService = doctorData.defaultService;
    useEffect(() => {
        if (data) {
            setSelectedSpecificationId(specializations[0]._id);
            setFieldValue(
                "defaultServiceId",
                doctorData.specializations[0]._id,
            );
        }
    }, [data]);

    return (
        <div>
            <p>Текущие специализации врача:</p>
            {doctorSpecializations.map((item, index) => (
                <div key={index}>
                    <div
                        style={{
                            marginTop: 20,
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                        }}
                    >
                        <p style={{ fontWeight: 700 }}>{item.name}</p>
                        <button
                            type="button"
                            onClick={() => {
                                dettachDoctorToSpecializationFunction({
                                    variables: {
                                        doctorId: doctorData._id,
                                        specializationId: item._id,
                                    },
                                });
                            }}
                            style={{
                                fontSize: 12,
                            }}
                        >
                            ❌
                        </button>
                    </div>
                </div>
            ))}

            <div style={{ marginTop: 20 }}>
                <select
                    className="select w-full py-3 bg-gray-100"
                    onChange={(e) => setSelectedSpecificationId(e.target.value)}
                >
                    {specializations.map((spec) => (
                        <option value={spec._id}>{spec.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center">
                <div className="h-px w-full bg-gray-100"></div>
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            const idx = doctorSpecializations.findIndex(
                                (item) => item._id === selectedSpecificationId,
                            );
                            if (idx === -1) {
                                attachDoctorToSpecializationFunction({
                                    variables: {
                                        doctorId: doctorData._id,
                                        specializationId:
                                            selectedSpecificationId,
                                    },
                                    onCompleted: () => location.reload(),
                                });
                            } else {
                                alert("Данная специальность уже есть!");
                            }
                        }}
                        className="text-xs text-pink-purple"
                    >
                        Добавить специализацию
                    </button>
                </div>
                <div className="h-px w-full bg-gray-100"></div>
            </div>
            <p className="mt-4">Улсуга по умолчанию для записи:</p>
            <div className="mt-4">
                <p style={{ fontWeight: 700 }}>
                    {defaultService?.name
                        ? defaultService?.name +
                          " - " +
                          defaultService?.price +
                          " тг - " +
                          defaultService?.durationInMinutes +
                          " минут"
                        : "Нет услуги по умолчанию"}
                </p>
            </div>
            <div style={{ marginTop: 20 }}>
                <select
                    className="select w-full py-3 bg-gray-100"
                    onChange={(e) =>
                        setFieldValue("defaultServiceId", e.target.value)
                    }
                >
                    {services.map((service) => (
                        <option value={service?._id}>
                            {service?.name} - {service?.price} тг -{" "}
                            {service?.durationInMinutes} минут
                        </option>
                    ))}
                </select>
            </div>

            <div
                className="flex items-center"
                style={{ justifyContent: "center", marginTop: 30 }}
            >
                <button
                    type="submit"
                    className="py-3 px-5 bg-pink-purple text-white rounded"
                >
                    Сохранить
                </button>
            </div>
        </div>
    );
};
