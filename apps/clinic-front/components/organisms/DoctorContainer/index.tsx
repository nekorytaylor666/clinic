import React from "react";

import AppointmentTimetable from "components/molecules/AppointmentTimeTable";
import { Doctor } from "custom_typings/doctor";
import Image from "next/image";
import Link from "next/link";
interface Props {
    doctor: GetAllDoctors_getAllDoctors;
}
import { GetAllDoctors_getAllDoctors } from "@graphqlTypes/GetAllDoctors";
import { GET_SERVICE_BY_ID } from "graphql/queries/getServiceById";
import { useQuery } from "@apollo/client";
import { formatDistanceStrict } from "date-fns";
import { ru } from "date-fns/locale";
import { GET_DOCTOR_BY_ID } from "graphql/queries";
import { GetDoctorByID } from "@graphqlTypes/GetDoctorByID";
const DoctorContainer: React.FC<Props> = ({ doctor }: Props) => {
    const { data, loading } = useQuery<GetDoctorByID>(GET_DOCTOR_BY_ID, {
        variables: { doctorId: doctor._id },
    });

    const doctorData = data?.getDoctorByID;
    const { data: serviceRes, loading: serviceLoading } = useQuery(
        GET_SERVICE_BY_ID,
        {
            variables: {
                serviceId: doctorData?.defaultService?._id,
            },
            skip: !doctorData?.defaultService?._id,
        },
    );
    return (
        <>
            <div className="rounded-2xl hidden lg:grid grid-cols-3 bg-white shadow-lg my-5 hover:shadow-lg hover:scale-110 transition-all ease-in-out">
                <Link href={`/doctor/${doctor._id}`}>
                    <div className="flex flex-col flex-1 items-start pt-4 pl-4 cursor-pointer">
                        <img
                            src={doctor?.avatar?.xl ?? "/images/doctor.png"}
                            className="h-full px-4 pt-4 w-4/5 justify-end object-contain"
                        />
                    </div>
                </Link>
                <Link href={`/doctor/${doctor._id}`}>
                    <div className="py-8 space-y-5 cursor-pointer">
                        <div>
                            <p className="text-3xl font-bold">
                                {doctor?.fullName}
                            </p>
                            <p className="text-lg text-gray-400">
                                {doctor?.specializations?.map(
                                    (specialization) =>
                                        specialization.name + " ",
                                )}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold mr-1">
                                {" "}
                                {formatDistanceStrict(
                                    new Date(doctor?.startingExperienceDate),
                                    new Date(),
                                    {
                                        locale: ru,
                                        addSuffix: false,
                                    },
                                )}{" "}
                            </p>
                            <p>опыта работы</p>
                        </div>
                        <div>
                            <p className="text-special-green font-semibold">
                                {doctor?.rating?.toPrecision(2)} / 10
                            </p>
                            <p>
                                Рейтинг на основе {doctor.numOfRatings} отзывов
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">
                                {!serviceRes?.getServiceById && "Нет услуги"}
                                {!serviceLoading &&
                                    serviceRes?.getServiceById &&
                                    serviceRes?.getServiceById?.price +
                                        " " +
                                        "тг."}{" "}
                            </p>
                            <p>{serviceRes?.getServiceById?.name}</p>
                        </div>
                    </div>
                </Link>

                <div className="py-8 pr-8 space-y-2">
                    {loading ? (
                        <div className="h-full w-full flex justify-center items-center">
                            <div className="lds-ripple">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        Boolean(serviceRes?.getServiceById?.price) && (
                            <AppointmentTimetable
                                doctor={doctor}
                            ></AppointmentTimetable>
                        )
                    )}
                </div>
            </div>
            <div className="rounded-2xl grid lg:hidden grid-cols-1  p-4 bg-white shadow-lg my-5 hover:shadow-lg hover:scale-110 transition-all ease-in-out">
                <Link href={`/doctor/${doctor._id}`}>
                    <div className="py-8 space-y-5 cursor-pointer">
                        <div>
                            <p className="text-3xl font-bold">
                                {doctor?.fullName}
                            </p>
                            <p className="text-lg text-gray-400">
                                {doctor?.specializations?.map(
                                    (specialization) =>
                                        specialization.name + " ",
                                )}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold mr-1">10</p>
                            <p>Опыт работы</p>
                        </div>
                        <div>
                            <p className="text-special-green font-semibold">
                                {doctor.rating} / 10
                            </p>
                            <p>
                                Рейтинг на основе {doctor.numOfRatings} отзывов
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">
                                {!serviceRes?.getServiceById && "Нет услуги"}
                                {!serviceLoading &&
                                    serviceRes?.getServiceById &&
                                    serviceRes?.getServiceById?.price +
                                        " " +
                                        "тг."}{" "}
                            </p>
                            <p>{serviceRes?.getServiceById?.name}</p>
                        </div>
                    </div>
                </Link>
                <Link href={`/doctor/${doctor._id}`}>
                    <div className="flex flex-col flex-1 items-start pt-4 pl-4 cursor-pointer">
                        <img
                            src={doctor?.avatar?.xl ?? "/images/doctor.png"}
                            className="h-full px-4 pt-4 w-4/5 justify-end object-contain"
                        />
                    </div>
                </Link>

                <div className="py-8 space-y-2">
                    {serviceRes?.getServiceById?._id && (
                        <AppointmentTimetable
                            doctor={doctor}
                        ></AppointmentTimetable>
                    )}
                </div>
            </div>
        </>
    );
};

export default DoctorContainer;
