import React, { useRef } from 'react';
import { Card, Menu, Checkbox } from "antd";
import { HomeOutlined, PrinterOutlined } from '@ant-design/icons';
import ReactToPrint from 'react-to-print';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_APPLICATION } from "./utils";
import SimpleCrypto from "simple-crypto-js";
import QrCode from 'qrcode.react';

const AESKey = "COVID-19R35P0N5E-2020";
const appCrypt = new SimpleCrypto(AESKey);

const PrinterFriendly = () => {
  let { application: id } = useParams()
  const { loading, error, data } = useQuery(GET_APPLICATION, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const verifier = appCrypt.encrypt(JSON.stringify(data))

  return <Card style={{ marginLeft: 10, marginRight: 10 }}>
    <table className="my-2 w-full border-collapse">
      <tbody>
        <tr>
          <td className="border p-1">JUMP NO:</td>
          <td className="border p-1">XXX</td>
          <td className="border p-1">DRIVE MOH ID:</td>
          <td className="border p-1">XXX</td>
        </tr>
        <tr>
          <td className="border p-1">APPLICANT:</td>
          <td className="border p-1">{data.applicationById.companyByCompany?.companyName}</td>
          <td className="border p-1">CONTACT:</td>
          <td className="border p-1">{data.applicationById.companyByCompany?.phone}</td>
        </tr>
      </tbody>
    </table>

    <table className="my-2 w-full border-collapse">
      <tbody>
        <tr>
          <td>
            A DRIVER/ DRIVER ASSISTANT/ TRUCK / CARGO DETAILS
        </td>
        </tr>
        <tr>
          <td className="border p-1">DRIVER NAME</td>
          <td className="border p-1">{data.applicationById.staffByDriver?.firstName} {data.applicationById.staffByDriver?.lastName}</td>
          <td className="border p-1">PERMIT NO</td>
          <td className="border p-1">{data.applicationById.staffByDriver?.permitNo}</td>
        </tr>
        <tr>
          <td className="border p-1">NATIONALITY</td>
          <td className="border p-1">{data.applicationById.staffByDriver?.nationality}</td>
          <td className="border p-1">GENDER</td>
          <td className="border p-1">{data.applicationById.staffByDriver?.sex}</td>

        </tr>

        <tr>
          <td className="border p-1" rowSpan={2}>ASSISTANTS</td>
          <td className="border p-1">1. &nbsp;{data.applicationById.staffByAssistantDriver?.firstName} {data.applicationById.staffByAssistantDriver?.lastName} </td>
          <td className="border p-1">DRIVE COUNT</td>
          <td className="border p-1"></td>
        </tr>

        <tr>
          <td className="border p-1">2. &nbsp;{data.applicationById.staffBySupervisor?.firstName} {data.applicationById.staffBySupervisor?.lastName} </td>
          <td className="border p-1">MANAGER COUNT</td>
          <td className="border p-1"></td>
        </tr>

        <tr>
          <td className="border p-1">TRUCK NO</td>
          <td className="border p-1">{data.applicationById.vehicleByVehicle?.headRegistrationNo}</td>
          <td className="border p-1">TRAILER NO(s)</td>
          <td className="border p-1">{data.applicationById.trailerNo}</td>
        </tr>

        <tr>
          <td className="border p-1">LOADED</td>
          <td className="border p-1"><Checkbox checked={data.applicationById.loaded} disabled={true} /></td>
          <td className="border p-1">TRAILER NO(s)</td>
          <td className="border p-1">{data.applicationById.trailer2No}</td>
        </tr>

        <tr>
          <td className="border p-1">CARGO DETAILS</td>
          <td className="border p-1" colSpan={3}>{data.applicationById.cargoNature}</td>
        </tr>

        <tr>
          <td className="border p-1">CLIENT DETAILS</td>
          <td className="border p-1" colSpan={3}>{data.applicationById.clientDetails}</td>
        </tr>
      </tbody>
    </table>

    <table className="my-2 w-full border-collapse">
      <tbody>
        <tr>
          <td>
            B JOURNEY/ ROUTING INFORMATION
        </td>
        </tr>
        <tr>
          <td className="border p-1" rowSpan={2}>DEPARTURE</td>
          <td className="border p-1">EXPECTED DATE</td>
        </tr>
        <tr>
          <td className="border p-1">{data.applicationById.expectedDepartureDate}</td>
        </tr>
      </tbody>
    </table>
    <table className="my-2 w-full border-collapse">
      <tbody>
        <tr>
          <td className="border p-1">DEPARTURE PLACE </td>
          <td className="border p-1">{data.applicationById.departureCountry}</td>
          <td className="border p-1">JMP TERMINATES AT</td>
          <td className="border p-1">{data.applicationById.approvalTerminationCountry}</td>
        </tr>

        <tr>
          <td className="border p-1">FINAL DESTINATION </td>
          <td className="border p-1">{data.applicationById.destinationCountry}</td>
          <td className="border p-1">JMP EXPIRES ON</td>
          <td className="border p-1">{data.applicationById.jmpExpiryDate}</td>
        </tr>

        <tr>
          <td className="border p-1">JMP DISTANCE </td>
          <td className="border p-1">{data.applicationById.approvalDistance}</td>
          <td className="border p-1">TOTAL</td>
          <td className="border p-1">{data.applicationById.approvalDistance}</td>
        </tr>
      </tbody>
    </table>
    <QrCode value={verifier} style={{ marginBottom: 20, width: 128, height: 128 }} renderAs="svg" />
  </Card>
}

class Instance extends React.Component {
  render() {
    return <PrinterFriendly />;
  }
}

export const PrintApplication = () => {
  const componentRef = useRef();
  return (
    <div>
      <Menu mode="horizontal" theme="light">
        <Menu.Item key="print">
          <ReactToPrint
            trigger={() => <span>
              <PrinterOutlined /> PRINT PASS
                </span>}
            content={() => componentRef.current}
          />
        </Menu.Item>

        <Menu.Item key="home">
          <Link to="/home/applications">
            <HomeOutlined />
            BACK TO LIST
          </Link>
        </Menu.Item>
      </Menu>
      <Instance ref={componentRef} />
    </div>
  );
}
