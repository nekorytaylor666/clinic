import { Field } from "formik";
import Link from "next/link";
import { FC } from "react";
import { FormStepProps } from "./types";

export const WorkTimes: FC<FormStepProps> = ({ onNext, onPrev }) => {
    return (
        <div className="space-y-3">
            <p>Рабочие часы</p>
            <div className="space-y-2">
                <div>
                    <p>Начало</p>
                    <Field
                        name="workTimes.startTime"
                        type="text"
                        placeholder="8:30"
                        className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                    />
                </div>
                <div>
                    <p>Конец</p>
                    <Field
                        name="workTimes.endTime"
                        type="text"
                        placeholder="18:30"
                        className="bg-gray-100 focus:bg-white w-full input input-ghost border focus:border-pink-purple"
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onPrev}
                    className="py-3 px-5 border border-pink-purple text-pink-purple rounded"
                >
                    Назад
                </button>
                <button
                    type="submit"
                    className="py-3 px-5 bg-pink-purple text-white rounded"
                >
                    Изменить
                </button>
            </div>
        </div>
    );
};
