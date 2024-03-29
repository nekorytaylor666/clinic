/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSpecializationById
// ====================================================

export interface GetSpecializationById_getSpecializationById_colorCodeGradient {
  __typename: "ColorCodeGradientGraph";
  start: string | null;
  finish: string | null;
}

export interface GetSpecializationById_getSpecializationById_doctors_defaultService {
  __typename: "Service";
  _id: string;
  name: string;
  price: number;
  durationInMinutes: number | null;
}

export interface GetSpecializationById_getSpecializationById_doctors_avatar {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetSpecializationById_getSpecializationById_doctors_upcomingBookings {
  __typename: "Booking";
  _id: string;
  startDate: any;
  endDate: any;
}

export interface GetSpecializationById_getSpecializationById_doctors_specializations {
  __typename: "Specialization";
  name: string;
}

export interface GetSpecializationById_getSpecializationById_doctors_workTimes {
  __typename: "WorkTime";
  endTime: any;
  startTime: any;
  isActive: boolean | null;
}

export interface GetSpecializationById_getSpecializationById_doctors {
  __typename: "Doctor";
  _id: string;
  fullName: string;
  acceptableAgeGroup: string | null;
  description: string | null;
  email: string;
  numOfRatings: number;
  phoneNumber: string;
  rating: number | null;
  startingExperienceDate: any | null;
  defaultService: GetSpecializationById_getSpecializationById_doctors_defaultService | null;
  avatar: GetSpecializationById_getSpecializationById_doctors_avatar | null;
  upcomingBookings: GetSpecializationById_getSpecializationById_doctors_upcomingBookings[] | null;
  specializations: GetSpecializationById_getSpecializationById_doctors_specializations[] | null;
  workTimes: GetSpecializationById_getSpecializationById_doctors_workTimes[] | null;
}

export interface GetSpecializationById_getSpecializationById_photoURL {
  __typename: "PhotoURL";
  xl: string | null;
}

export interface GetSpecializationById_getSpecializationById {
  __typename: "Specialization";
  _id: string;
  name: string;
  description: string;
  colorCodeGradient: GetSpecializationById_getSpecializationById_colorCodeGradient | null;
  doctors: GetSpecializationById_getSpecializationById_doctors[];
  photoURL: GetSpecializationById_getSpecializationById_photoURL | null;
}

export interface GetSpecializationById {
  getSpecializationById: GetSpecializationById_getSpecializationById;
}

export interface GetSpecializationByIdVariables {
  id: string;
}
