import React, {useRef} from 'react';
import {Card, Menu} from "antd";
import {HomeOutlined, PrinterOutlined} from '@ant-design/icons';
import ReactToPrint from 'react-to-print';
import {Link} from 'react-router-dom';

const PrinterFriendly = () => {
  return <Card>
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
        <td className="border p-1">XXX</td>
        <td className="border p-1">CONTACT:</td>
        <td className="border p-1">XXX</td>
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
        <td className="border p-1">XXX</td>
        <td className="border p-1">PERMIT NO</td>
        <td className="border p-1">XXX</td>
      </tr>
      <tr>
        <td className="border p-1">NATIONALITY</td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">GENDER</td>
        <td className="border p-1">XXX</td>

      </tr>

      <tr>
        <td className="border p-1" rowSpan={2}>ASSISTANTS</td>
        <td className="border p-1">1. </td>
        <td className="border p-1">DRIVE COUNT</td>
        <td className="border p-1">XXX</td>
      </tr>

      <tr>
        <td className="border p-1">2. </td>
        <td className="border p-1">MANAGER COUNT</td>
        <td className="border p-1">XXX</td>
      </tr>

      <tr>
        <td className="border p-1">TRUCK NO</td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">TRAILER NO(s)</td>
        <td className="border p-1">XX</td>
      </tr>

      <tr>
        <td className="border p-1">LOADED</td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">TRAILER NO(s)</td>
        <td className="border p-1">XX</td>
      </tr>

      <tr>
        <td className="border p-1">CARGO DETAILS</td>
        <td className="border p-1" colSpan={3}>XXX</td>
      </tr>

      <tr>
        <td className="border p-1">CLIENT DETAILS</td>
        <td className="border p-1" colSpan={3}>XXX</td>
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
        <td className="border p-1">EXPECTED TIME</td>
        <td className="border p-1">ACTUAL DATE</td>
        <td className="border p-1">ACTUAL TIME</td>
      </tr>
      <tr>
        <td className="border p-1">XXX</td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">XXX</td>
      </tr>
      </tbody>
    </table>
    <table className="my-2 w-full border-collapse">
      <tbody>
      <tr>
        <td className="border p-1">DEPARTURE PLACE </td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">JMP TERMINATES AT</td>
        <td className="border p-1">XXX</td>
      </tr>

      <tr>
        <td className="border p-1">FINAL DESTINATION </td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">JMP EXPIRES ON</td>
        <td className="border p-1">XXX</td>
      </tr>

      <tr>
        <td className="border p-1">JMP DISTANCE </td>
        <td className="border p-1">XXX</td>
        <td className="border p-1">TOTAL</td>
        <td className="border p-1">XXX</td>
      </tr>
      </tbody>
    </table>
  </Card>
}

class Instance extends React.Component {
  render() {
    return <PrinterFriendly/>;
  }
}

export const PrintApplication = () => {
  const componentRef = useRef();
  return (
    <div>
      <Menu mode="horizontal" theme="light" defaultSelectedKeys={['print']}>
        <Menu.Item key="print" style={{marginLeft: 20}}>
          <ReactToPrint
            trigger={() => <span>
                 <PrinterOutlined/> PRINT PASS
                </span>}
            content={() => componentRef.current}
          />
        </Menu.Item>

        <Menu.Item key="home">
          <Link to="/home/applications">
            <HomeOutlined/>
            BACK TO LIST
          </Link>
        </Menu.Item>
      </Menu>
      <Instance ref={componentRef}/>
    </div>
  );
}
