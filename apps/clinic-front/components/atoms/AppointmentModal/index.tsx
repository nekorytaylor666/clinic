import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import {
    CREATE_BOOKING,
    CHECK_SMS_VERIFICATION,
    SEND_VER_SMS,
    REGISTER_USER,
} from "graphql/mutations/";
import InputMask from "react-input-mask";

//Recoil Hooks
import { useAppointment } from "@recoil/hooks";

// Helper Functions
import { getDate, getTime, getDayName } from "src/helper";
import {
    CreateBooking,
    CreateBookingVariables,
    CreateBooking_createBooking,
} from "@graphqlTypes/CreateBooking";
import { GET_SERVICE_BY_ID } from "graphql/queries/getServiceById";
interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
}

const AppointmentModal = () => {
    const [appointmentData, { setShow }] = useAppointment();
    const { show, doctor, time } = appointmentData;

    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const validate = (values: FormValues) => {
        // const errors: FormValues = {
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     dateOfBirth: "",
        //     phoneNumber: "",
        // };
        let ok = true;

        if (!values.firstName) {
            ok = false;
        }

        if (!values.lastName) {
            ok = false;
        }
        if (!values.email) {
            ok = false;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            ok = false;
        }
        if (!values.dateOfBirth) {
            ok = false;
        }
        if (!values.phoneNumber) {
            ok = false;
        }

        console.log("validation", ok);
        return ok;
    };
    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phoneNumber: "",
    };
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            alert(values.firstName);
        },
    });

    const [smsCode, setSmsCode] = useState("");
    const [appointmentSent, setAppointmentSent] = useState(false);
    const [seconds, setSeconds] = useState(30);
    const [token, setToken] = useState("");
    useEffect(() => {
        if (seconds > 0 && appointmentSent) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        }
    });

    const closeModal = (e: React.SyntheticEvent) => {
        if (modalRef.current === e.target) {
            setShow(false);
        }
    };

    const [sendVerSMS] = useMutation(SEND_VER_SMS, {
        variables: {
            phoneNumber: formik.values.phoneNumber,
        },
        onError: (err) => {
            console.log(err.message);
        },
        onCompleted: () => {
            setAppointmentSent(!appointmentSent);
        },
    });
    const [checkSMSVerification] = useMutation(CHECK_SMS_VERIFICATION, {
        variables: {
            code: smsCode,
            phoneNumber: formik.values.phoneNumber,
        },
        onError: (err) => {
            console.log(err.message);
        },
        onCompleted: (data) => {
            setToken(data.checkSMSVerificationCode.token);
            registerUser();
        },
    });
    const [createBooking] = useMutation<CreateBooking, CreateBookingVariables>(
        CREATE_BOOKING,
    );
    const { data: serviceRes, loading: serviceLoading } = useQuery(
        GET_SERVICE_BY_ID,
        {
            variables: {
                serviceId: "618c0c4985b2fd7b37e3656e",
            },
        },
    );
    const [registerUser] = useMutation(REGISTER_USER, {
        variables: {
            dateOfBirth: new Date(formik.values.dateOfBirth),
            email: formik.values.email,
            fullName: formik.values.firstName + " " + formik.values.lastName,
            phoneNumber: formik.values.phoneNumber,
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
        onError: (err) => {
            console.log(err.message);
        },
        onCompleted: async (data) => {
            await createBooking({
                variables: {
                    doctorId: doctor?._id,
                    endDate: new Date(time.end),
                    startDate: new Date(time.start),
                    userId: data.registerUser._id,
                    serviceId: "618c0c4985b2fd7b37e3656e",
                },
                context: {
                    headers: {
                        Authorization: token,
                    },
                },
                onError: (err) => {},
            });
            router.push("/success");
        },
    });

    const sendVerificationCode = async () => {
        const validation = validate(formik.values);
        console.log("errors:", validation);
        if (!validation) {
            return alert("???? ?????? ???????????? ??????????????????");
        }
        await sendVerSMS();
    };

    const checkVerificationCode = async () => {
        await checkSMSVerification();
    };

    const resetSms = () => {
        setSmsCode("");
        setSeconds(30);
        sendVerSMS();
    };
    if (!show) {
        return <></>;
    }

    return (
        <>
            <Background ref={modalRef} onClick={closeModal}>
                <motion.div
                    style={{
                        height: "100%",
                        width: "99%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    animate={{ y: [0, -20, 0], opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <StyledModalContainer className="py-8 px-6 bg-gray-100 rounded-2xl w-full lg:w-5/12 space-y-4 overflow-y-scroll h-screen lg:h-auto">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-3xl font-bold">
                                    ???????????? ???? ??????????
                                </p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 flex flex-col items-center">
                                <Image
                                    width={216}
                                    height={163}
                                    src={
                                        doctor?.avatar?.xl ??
                                        "/images/doctor.png"
                                    }
                                    className="self-start object-contain object-bottom "
                                />
                            </div>
                            <div className="flex flex-1 flex-col items-center">
                                <div>
                                    <p className="text-dark-grey">
                                        {doctor?.specializations
                                            ?.map((spec) => spec.name)
                                            .join(", ")}
                                    </p>
                                    <p className="text-xl font-bold">
                                        {doctor?.fullName}
                                    </p>
                                    <p>
                                        ???????? ???????????? ?????????????????? | ????????????????
                                        ?????????????????????? ????????
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            {!serviceLoading && (
                                <p className="text-xl text-dark-grey">
                                    ?????????????????? ???????????? "
                                    {serviceRes.getServiceById.name}":{" "}
                                    {serviceRes.getServiceById.price} ????.
                                </p>
                            )}
                        </div>
                        <div className="space-y-4">
                            {/* <div className="space-y-2">
                                <p className="text-dark-grey">
                                    ???????? ?? ?????????? ????????????
                                </p>
                                <input
                                    type="text"
                                    className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                    value="8 ????????, ??????????????, 13:00"
                                />
                            </div> */}
                            <div className="flex space-x-2">
                                <div className="flex-1 space-y-2">
                                    <p className="text-dark-grey">
                                        ?????? ????????????????
                                    </p>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                        placeholder="??????"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-dark-grey">
                                        ?????????????? ????????????????
                                    </p>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                        placeholder="??????????????"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="flex-1 space-y-2">
                                    <p className="text-dark-grey">
                                        ???????? ???????????????? ????????????????
                                    </p>
                                    <input
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        type="date"
                                        className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                        placeholder="????-????-????????"
                                        pattern="????-????-????????"
                                        defaultValue="????-????-????????"
                                        value={formik.values.dateOfBirth}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-dark-grey">
                                        ???????? ?? ?????????? ????????????
                                    </p>
                                    <input
                                        type="text"
                                        className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                        value={`${getDayName(
                                            time.start,
                                        )}, ${getDate(time.start)}, ${getTime(
                                            time.start,
                                        )}`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-dark-grey">
                                    Email ?????? ?????????????????? ???????????? ?? ??????????????????
                                </p>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                    placeholder="example@email.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-dark-grey">
                                    ?????????????? ?????? ?????????????????????????? ????????????
                                </p>
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                    placeholder="+7 ("
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                />
                                <p className="text-dark-grey text-sm">
                                    ???? ???????? ?????????? ?????? ???????????? SMS ?? ??????????
                                    ??????????????????????????
                                </p>
                            </div>
                            {appointmentSent ? (
                                <div>
                                    {seconds > 0 ? (
                                        <p className="text-pink-purple text-sm">
                                            ?????????????????? ?????? ?????? ??????????{" "}
                                            <span>{seconds}</span> ????????????
                                        </p>
                                    ) : (
                                        <button
                                            className="bg-pink-purple w-full px-2 py-3 text-white rounded"
                                            onClick={resetSms}
                                        >
                                            ??????????????????????????
                                        </button>
                                    )}
                                    <p className="text-dark-grey">?????? ???? SMS</p>
                                    <div className="flex space-x-2">
                                        <div className="flex-1">
                                            <input
                                                type="numeric"
                                                className="px-2 py-3 w-full border border-gray-300 focus:outline-none focus:border-pink-purple rounded"
                                                value={smsCode}
                                                onChange={(e) =>
                                                    setSmsCode(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <button
                                                className="bg-pink-purple w-full px-2 py-3 text-white rounded"
                                                onClick={checkVerificationCode}
                                            >
                                                ??????????????????????
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        className="bg-pink-purple w-full px-2 py-3 text-white rounded"
                                        onClick={sendVerificationCode}
                                    >
                                        ?????????????????? ?????? ??????????????????????????
                                    </button>
                                </div>
                            )}
                        </div>
                    </StyledModalContainer>
                </motion.div>
            </Background>
        </>
    );
};

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30;
`;

const StyledModalContainer = styled.div`
    position: absolute;
    z-index: auto;
`;

export default AppointmentModal;
