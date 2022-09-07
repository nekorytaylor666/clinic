import client from "src/apollo/apollo-client";
import gql from "graphql-tag";
import { Session } from "custom_typings/session";

export const START_SESSION_MUTATION = gql`
    mutation StartSession($bookingId: String!) {
        startSession(bookingId: $bookingId) {
            _id
        }
    }
`;
export const END_SESSION_MUTATION = gql`
    mutation EndSession($sessionId: String!) {
        endSession(sessionId: $sessionId) {
            _id
        }
    }
`;

interface StartSessionRes {
    startSession: Session;
}

export const startSessionMutation = async (
    variables: { bookingId: string },
    { token }: { token: string },
): Promise<Session | undefined> => {
    const { data } = await client.mutate<StartSessionRes>({
        mutation: START_SESSION_MUTATION,
        variables,
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data?.startSession;
    return res;
};
export const endSessionMutation = async (
    variables: { sessionId: string },
    { token }: { token: string },
): Promise<Session | undefined> => {
    const { data } = await client.mutate<any>({
        mutation: END_SESSION_MUTATION,
        variables,
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data?.endSession;
    return res;
};

export const UPLOAD_SESSION_BLANK = gql`
    mutation CreateSessionBlank(
        $complaints: CreateComplaint!
        $diagnose: CreateDiagnose!
        $inspections: [String!]!
        $sessionId: String!
    ) {
        createSessionBlank(
            complaints: $complaints
            diagnose: $diagnose
            inspections: $inspections
            sessionId: $sessionId
        ) {
            __typename
        }
    }
`;

interface UploadSessionArguments {
    appointmentResults: {
        description: string;
    };
    complaints: {
        complaint: string;
        reason: string;
        sicknessTimeDuration: string;
    };
    diagnose: {
        deseaseDBCode: string;
        diagnose: string;
        natureOfTheDesease: string;
        preliminary: boolean;
    };
    inspections: string[];
}

interface UploadSessionResponse {
    createSessionBlank: { __typename: string[] };
}

export const uploadSessionBlank = async (
    {
        session,
        sessionId,
    }: { session: UploadSessionArguments; sessionId: string },
    { token }: { token: string },
): Promise<{ __typename: string[] } | undefined> => {
    const { data } = await client.mutate<UploadSessionResponse>({
        mutation: UPLOAD_SESSION_BLANK,
        variables: { ...session, sessionId },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const res = data?.createSessionBlank;
    return res;
};
