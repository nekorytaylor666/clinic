import { PatientEntity } from "@core/types/patient/IPatient";
import React from "react";

const PatientInfo = ({ patient }: { patient: PatientEntity }) => {
    return (
        <div className="mb-4">
            <div className="grid grid-cols-8 w-full gap-4 items-center">
                <div className="avatar col-span-1 flex items-center justify-center">
                    <div className="rounded-full w-24 bg-primary h-24">
                        <span className="text-4xl text-white uppercase flex items-center justify-center h-full">
                            {patient.fullName?.[0]}
                        </span>
                    </div>
                </div>
                <div className="h-full col-span-3">
                    <div className="h-full w-full bg-base-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className=" text-xl font-medium">
                                Основное
                            </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p>
                                <span className="text-base-300 mr-1">Пол:</span>
                                <span>Мужской</span>
                            </p>
                            <p>
                                <span className="text-base-300 mr-1">
                                    Дата рождение:
                                </span>
                                <span>23.11.2000</span>
                            </p>
                            <p>
                                <span className="text-base-300 mr-1">
                                    Возраст:
                                </span>
                                <span>22 года</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-full bg-base-200 rounded-lg col-span-2 p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className=" text-xl font-medium">Контакты</span>
                    </div>
                    <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-center justify-start">
                            <p className="text-base-300 mr-1">Почта:</p>
                            <p className="truncate w-1/2">
                                jean2wwwфывафываыаф@gmail.com
                            </p>
                        </div>
                        <div className="flex items-center justify-start">
                            <p className="text-base-300 mr-1">Возраст:</p>
                            <p>22 года</p>
                        </div>
                    </div>
                </div>
                <div className="h-full bg-base-200 rounded-lg col-span-2 p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className=" text-xl font-medium">
                            Особенности
                        </span>
                    </div>
                    <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-center justify-start">
                            <p className="text-base-300 mr-1">Аллергии:</p>
                            <p>Нет</p>
                        </div>
                    </div>
                </div>
                <div className="h-full bg-base-200 rounded-lg col-span-2"></div>
            </div>
        </div>
    );
};

export default PatientInfo;
