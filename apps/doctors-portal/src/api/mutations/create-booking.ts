import { gql } from "@apollo/client";

export const CREATE_BOOKING_MUTATION = gql`
    mutation CreateBooking(
        $doctorId: String!
        $endDate: DateTime
        $serviceId: String
        $startDate: DateTime!
        $userId: String
    ) {
        createBooking(
            doctorId: $doctorId
            serviceId: $serviceId
            startDate: $startDate
            userId: $userId
            endDate: $endDate
        ) {
            _id
            startDate
        }
    }
`;

export const ADD_DOCTOR_TO_BLANK = gql`
    mutation AddDoctorToAppointmentBlank(
        $appointmentBlankId: String!
        $doctorId: String!
    ) {
        addDoctorToAppointmentBlank(
            appointmentBlankId: $appointmentBlankId
            doctorId: $doctorId
        ) {
            _id
        }
    }
`;
