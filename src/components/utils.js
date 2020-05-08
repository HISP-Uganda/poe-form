import gql from 'graphql-tag';

const TOKEN_KEY = 'jwt';

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
}


export const GET_STAFF = gql`
query getStaff($condition:StaffCondition) {
  allStaff(condition: $condition) {
    nodes{
      id
      firstName
      lastName
      nationalIdNo
      nationality
    }
  }
}
`;


export const CREATE_STAFF = gql`
  mutation createStaff(
    $input: CreateStaffInput!
  ) {
    createStaff(input: $input){
      staff{
        id
      }
    }
  }
`;


export const GET_COMPANY_APPLICATIONS = gql`
query getApplications($condition:ApplicationCondition) {
    allApplications(condition: $condition) {
    nodes{
      id
    }
  }
}
`;

export const CREATE_APPLICATION = gql`
mutation createApplication(
  $input: CreateApplicationInput!
) {
  createApplication(input: $input){
    application{
      id
    }
  }
}
`;

export const LOGIN = gql`
query getLogin($mail:String!) {
  login(mail: $mail) {
    id
    password
  }
}
`;

export const CREATE_COMPANY = gql`
  mutation createCompany(
    $input: CreateCompanyInput!
  ) {
    createCompany(input: $input){
      company{
        id
      }
    }
  }
`;


export const GET_VEHICLES = gql`
query getVehicles($condition:VehicleCondition) {
  allVehicles(condition: $condition) {
    nodes{
      id
      headRegistrationNo
    }
  }
}
`;

export const CREATE_VEHICLE = gql`
  mutation createVehicle(
    $input: CreateVehicleInput!
  ) {
    createVehicle(input: $input){
      vehicle{
        id
      }
    }
  }
`;