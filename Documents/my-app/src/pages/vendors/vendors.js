import React, { useEffect, useState } from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
} from "devextreme-react/data-grid";
import { GroupPanel } from "devextreme-react/data-grid";
import axios from "axios";
import "./vendors.css";
import { useNavigate } from "react-router-dom";

export default function Vendors() {
  const [src, setSrc] = useState([]);
  const [arrName, setObjName] = useState({});
  useEffect(() => {
    async function fetchData() {
      //194.87.239.231:55555/api/Vendor?have_pricelist=1

      // axios
      //   .post("http://194.87.239.231:55555/api/logon", {
      //     login: "admin",
      //     password: "11083",
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //     localStorage.clear();
      //     localStorage.setItem("login1", response.data.user.login);
      //     localStorage.setItem("token1", response.data.result);
      //   })
      //   .catch((error) => {
      //     console.warn(error);
      //   });

      await axios(
        `http://194.87.239.231:55555/api/document/${localStorage.getItem(
          "vendorId"
        )}`,
        {
          headers: {
            //"content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            User: `${localStorage.getItem("login")}`,
          },
        }
      ).then((data) => {
        setSrc(data.data);
        let res = {};
        data.data.profile.columns.forEach((col) => {
          res[col.code] = { name: col.name, position: col.position };
        });
        setObjName(res);
        console.log(res);
        console.log(data);
      });
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  function gotoPrice(e) {
    alert(2);
    // console.log(e);
    // localStorage.getItem("vendorId", e.data.id);
    // navigate("../vendors");
  }
  console.log(">>>>", src);
  //   const columns =
  //     src.length &&
  //     src.data.profile.columns.map((column) => (
  //       <Column
  //         dataField={column.code}
  //         width={190}
  //         caption={column.name}
  //         hidingPriority={1}
  //       />
  //     ));
  console.log(src?.profile?.columns);
  const columns =
    src &&
    src.profile.columns.map((column) => (
      <Column
        dataField={column.code}
        width={190}
        caption={column.name}
        hidingPriority={1}
      />
    ));
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Поставщики</h2>
      {Object.values(src).length && (
        <DataGrid
          className={"dx-card wide-card"}
          dataSource={[
            ...src.productsList.products.map((product) => ({
              ...product,
              ...product.meta,
            })),
          ]}
          showBorders={false}
          focusedRowEnabled={true}
          defaultFocusedRowIndex={0}
          columnAutoWidth={true}
          columnHidingEnabled={true}
          keyExpr="id"
          onRowClick={(e) => gotoPrice(e)}
        >
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} showInfo={true} />
          <FilterRow visible={true} />
          <GroupPanel visible={true} />
          {columns}
        </DataGrid>
      )}
    </React.Fragment>
  );
}

const dataSource = {
  store: {
    version: 2,
    type: "odata",
    key: "Task_ID",
    url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks",
  },
  expand: "ResponsibleEmployee",
  select: [
    "name",
    "code",
    "profile.name",
    // "Task_ID",
    // "Task_Subject",
    // "Task_Start_Date",
    // "Task_Due_Date",
    // "Task_Status",
    // "Task_Priority",
    // "Task_Completion",
    // "ResponsibleEmployee/Employee_Full_Name",
  ],
};

const priorities = [
  { name: "High", value: 4 },
  { name: "Urgent", value: 3 },
  { name: "Normal", value: 2 },
  { name: "Low", value: 1 },
];

const src = [
  {
    id: "564aec5e-e964-11eb-8407-5800e3fc6bdd",
    name: 'АО "Ладога Дистрибьюшен"',
    code: "00-00000039",
    info: "",
    address: null,
    havePriceList: 1,
    profile: {
      id: "6cdb67ae-6f44-47aa-b349-d85979464a31",
      name: "Ладога",
      vendorId: "",
      fileNameMask: "",
      columns: [],
      vendor: null,
      isDef: true,
      sourceType: 0,
    },
    url: null,
  },
  {
    id: "8d8870c7-5278-11ec-8414-5800e3fc6bdd",
    name: 'АО "ТД "АРОМА"',
    code: "IT-00000070",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "e1c3d7f4-6974-11ed-8303-001d7dd64d88",
    name: 'ООО " ТК АКВА ВИТА"',
    code: "IT-00000170",
    info: "",
    address: null,
    havePriceList: 1,
    profile: {
      id: "6d4b4786-07c1-445e-a97a-2d96c3fa72a5",
      name: "АкваВита",
      vendorId: "",
      fileNameMask: "",
      columns: [],
      vendor: null,
      isDef: true,
      sourceType: 0,
    },
    url: null,
  },
  {
    id: "3a55ba24-1a15-11ed-843a-5800e3fc6bdd",
    name: 'ООО "АЛКОСТИЛЬ"',
    code: "IT-00000127",
    info: "",
    address: null,
    havePriceList: 1,
    profile: {
      id: "51a8df33-831d-4108-bd04-d2505fa7e8aa",
      name: "Алкостиль",
      vendorId: "",
      fileNameMask: "",
      columns: [],
      vendor: null,
      isDef: true,
      sourceType: 0,
    },
    url: null,
  },
  {
    id: "553ffc40-f65c-11ee-8c11-d09466028ae0",
    name: 'ООО "Америа Русс',
    code: "IT-00000477",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "d648bf27-e088-11eb-82ca-001d7dd64d88",
    name: 'ООО "АСТ-интернэшнл инваэронмэнт"',
    code: "00-00000035",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "8757cfa7-0a3e-11ec-840d-c85b76f8ebbe",
    name: 'ООО "Вайн Дискавери"',
    code: "IT-00000053",
    info: "",
    address: null,
    havePriceList: 1,
    profile: {
      id: "9f360659-3951-4383-a091-70c69d71f1ef",
      name: "ВайнДискавери",
      vendorId: "",
      fileNameMask: "",
      columns: [],
      vendor: null,
      isDef: true,
      sourceType: 0,
    },
    url: null,
  },
  {
    id: "a412077a-fa54-11ee-8c13-d09466028ae0",
    name: 'ООО "ВЕЛЬД-21"',
    code: "IT-00000478",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "06ed053e-1d20-11ec-8410-5800e3fc6bdd",
    name: 'ООО "ВИНИКОМ"',
    code: "IT-00000061",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "be8bafc5-da4e-11ee-8c0a-d09466028ae0",
    name: 'ООО "Виноторговая компания "ФОРТ"',
    code: "IT-00000445",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "100126e0-c2c5-11eb-9674-a8a1595a0d25",
    name: 'ООО "Зета 33"',
    code: "00-00000012",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "883c698e-4a05-11ed-843f-5800e3fc6bdd",
    name: 'ООО "ИВС"',
    code: "IT-00000148",
    info: "",
    address: null,

    havePriceList: 1,
    profile: {
      id: "5a049c72-b241-49ab-b64c-b76b30b75f3e",
      name: "ИВС",
      vendorId: "",
      fileNameMask: "",
      columns: [],
      vendor: null,
      isDef: true,
      sourceType: 0,
    },
    url: null,
  },
  {
    id: "714004e6-1557-11ec-840e-5800e3fc6bdd",
    name: 'ООО "ЛУДИНГ"',
    code: "IT-00000058",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "726fdf2e-d5f9-11ec-842b-af7298440c81",
    name: 'ООО "МоРо"',
    code: "IT-00000101",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "57ab5d86-e5db-11ee-8c10-d09466028ae0",
    name: 'ООО "ПРЕМЬЕР-ВИН"',
    code: "IT-00000461",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "324194b9-a786-11ed-8458-5800e3fc6bdd",
    name: 'ООО "Фирма "С-2"',
    code: "IT-00000212",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "83702b66-5a8a-11ed-8444-5800e3fc6bdd",
    name: 'ООО "Фирма "Саман"',
    code: "IT-00000159",
    info: "",
    address: null,
    havePriceList: 1,
    profile: {
      id: "6cd2a779-4e74-4c98-9481-8c01f157df7d",
      name: "Саман",
      vendorId: "",
      fileNameMask: "",
      columns: [],
      vendor: null,
      isDef: true,
      sourceType: 0,
    },
    url: null,
  },
  {
    id: "af50bcfc-d60b-11ee-8c0a-d09466028ae0",
    name: 'ООО "ЦЕНТРОБАЛТ"',
    code: "IT-00000442",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
  {
    id: "5db6d5ce-82a8-11ed-8451-5800e3fc6bdd",
    name: 'ООО "ЮТА"',
    code: "IT-00000192",
    info: "",
    address: null,
    havePriceList: 1,
    profile: null,
    url: null,
  },
];
