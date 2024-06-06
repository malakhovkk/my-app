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
import { Tabs } from "devextreme-react";
import SelectBox, { SelectBoxTypes } from "devextreme-react/select-box";
import TextBox, { TextBoxTypes } from "devextreme-react/text-box";
import { MasterDetail } from "devextreme-react/data-grid";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { useCallback } from "react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { SearchPanel } from "devextreme-react/data-grid";
// import "devextreme/dist/css/dx.light.css";
export default function Vendors() {
  const [src, setSrc] = useState(null);
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

      axios(
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
      )
        .then((data) => {
          setSrc(data.data);
          let res = {};
          data.data.profile.columns.forEach((col) => {
            res[col.code] = { name: col.name, position: col.position };
          });
          setObjName(res);
          console.log(res);
          console.log(data);
        })
        .catch((e) => console.log);
    }
    fetchData();
  }, []);
  const navigate = useNavigate();
  function gotoPrice(e) {
    console.log(e);
    setCur(e.data.id + "::" + e.data.name + "::" + e.data.quant * e.data.price);

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
    src.profile.columns.map((column, idx) => (
      <Column
        dataField={column.code}
        width={190}
        caption={column.name}
        hidingPriority={idx}
      />
    ));
  // const onSelectionChanged = ({ selectedRowsData }) => {
  //   const data = selectedRowsData[0];
  //   setShowEmployeeInfo(!!data);
  //   setSelectedRowNotes(data && data.Notes);
  //   setSelectedRowPicture(data && data.Picture);
  // };

  const [cart, setCart] = useState({});
  console.log("cart", cart);

  const cellPrepared = (e) => {
    if (e.rowType === "data") {
      console.log(e.data);
      //if (e.column.dataField === "Speed" && e.data.Speed > e.data.SpeedLimit) {

      if (
        // e.column.dataField === "code" &&
        cart.hasOwnProperty(
          e.data.id + "::" + e.data.name + "::" + e.data.price * e.data.quant
        )
      ) {
        //e.cellElement.style.cssText = "color: white; background-color: purple";
        e.rowElement.style.cssText =
          "color: white; font-width:bold; background-color: #DDEC7B";
        return;
        // or
        //e.cellElement.classList.add("my-class");
      }
      if (
        // e.column.dataField === "code" &&
        e.data.linkId
      ) {
        //e.cellElement.style.cssText = "color: white; background-color: purple";
        e.rowElement.style.cssText =
          "color: white; font-width:bold; background-color: #b24fb2";
        // or
        //e.cellElement.classList.add("my-class");
      }
    }
  };
  //#b24fb2
  const [cur, setCur] = useState(null);
  const operation = (op) => {
    if (!cur) return;
    if (op > 0)
      setCart({
        ...cart,
        [cur]: !!!cart[cur] ? 1 : cart[cur] + 1,
      });
    else {
      let _cart = { ...cart };
      if (!cart.hasOwnProperty(cur)) return;
      if (cart[cur] <= 1) {
        delete _cart[cur];
        setCart(_cart);
        return;
      }

      setCart({
        ...cart,
        [cur]: !!!cart[cur] && cart[cur] < 1 ? 0 : cart[cur] - 1,
      });
    }
  };
  console.log(cart);
  const getCart = () => {
    let gc = [];
    for (let k in cart) {
      // console.log(k, " = ", cart);
      // res += (
      //   <div>
      //     {k} : {cart[k]}
      //   </div>
      // );
      console.log(cart[k]);
      gc.push({ [k]: cart[k] });
    }
    console.log("???", gc);
    return gc;
  };
  const [orderF, setOrderF] = useState(
    (() => {
      let gc = [];
      for (let k in cart) {
        // console.log(k, " = ", cart);
        // res += (
        //   <div>
        //     {k} : {cart[k]}
        //   </div>
        // );
        console.log(cart[k]);
        gc.push({ [k]: cart[k] });
      }
      console.log("???", gc);
      return gc;
    })()
  );
  useEffect(() => {
    let gc = [];
    for (let k in cart) {
      // console.log(k, " = ", cart);
      // res += (
      //   <div>
      //     {k} : {cart[k]}
      //   </div>
      // );
      console.log(cart[k]);
      gc.push({ [k]: cart[k] });
    }
    console.log("???", gc);
    setOrderF(gc);
    //setIsReadyForOrder(true);
  }, []);

  const tabsText = [
    {
      id: 0,
      text: "Прайс-лист",
    },
    {
      id: 1,
      text: "Корзина",
    },
    {
      id: 2,
      text: "Заказы",
    },
    // {
    //   id: 2,
    //   text: "Clients",
    // },
    // {
    //   id: 3,
    //   text: "Orders",
    // },
    // {
    //   id: 4,
    //   text: "Favorites",
    // },
    // {
    //   id: 5,
    //   text: "Search",
    // },
  ];
  const [tab, setTab] = useState(0);
  const changeTab = (e) => {
    setTab(e.itemData.id);
    setOrderF(getCart());
    if (tab === 2) getOrders();
    if (tab === 1) order();
  };

  const [isReadyForOrder, setIsReadyForOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const order = async () => {
    //await axios(``);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        User: `${localStorage.getItem("login")}`,
      },
    };
    await axios(
      `http://194.87.239.231:55555/api/shop/e419c34f-6856-11ea-8298-001d7dd64d88`,
      config
    )
      .then((data) =>
        setShops(data.data.map((el) => ({ id: el.id, name: el.name })))
      )
      .catch((e) => console.log);

    await axios(
      `http://194.87.239.231:55555/api/VendorContact/${localStorage.getItem(
        "vendorId"
      )}`,
      config
    )
      .then((data) =>
        setContacts(
          data.data.map((el) => ({ id: el.id, name: el.name, price: el.price }))
        )
      )
      .catch((e) => console.log);
  };
  const [ordersAll, setOrdersAll] = useState([]);
  const getOrders = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        User: `${localStorage.getItem("login")}`,
      },
    };

    //   await axios
    //     .get(
    //       `http://194.87.239.231:55555/api/order/${localStorage.getItem(
    //         "vendorId"
    //       )}`,
    //       config
    //     )
    //     .then((data) => {
    //       setOrdersAll(
    //         data.data.map((order) => {
    //           return order;
    //         })
    //       );
    //     })
    //     .catch((e) => console.log);
  };

  const completedValue = (rowData) => rowData.Status === "Completed";
  const [orderIdMaster, setOrderIdMaster] = useState("");
  const DetailTemplate = (props) => {
    const [res, setRes] = useState([]);
    const getOrder = async (id) => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          User: `${localStorage.getItem("login")}`,
        },
      };
      let data;
      try {
        data = await axios.get(
          `http://194.87.239.231:55555/api/ordercontent/${id}`,
          config
        );
      } catch (e) {
        console.error(e);
      }
      console.log(data);
      console.log(
        data.data.map((order) => ({
          id: order.id,
          Sku: order.product.sku,
          Name: order.product.name,
          Quant: order.quant,
          Comment: order.comment,
          Sum: order.sum,
        }))
      );
      // return data.data.map((order) => ({
      //   id: order.id,
      //   Sku: order.product.sku,
      //   Name: order.product.name,
      //   Quant: order.quant,
      //   Comment: order.comment,
      //   Sum: order.sum,
      // }));
      return await data.data.map((order) => ({
        id: order.id,
        Sku: order.product.sku,
        Name: order.product.name,
        Quant: order.quant,
        Comment: order.comment,
        Sum: order.sum,
        Number: order.number,
        ShopName: order.shopName,
      }));
    };
    // const { FirstName, LastName } = props.data.data;
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
      async function exec() {
        setDataSource(await getOrder(props.data.key));
      }
      exec();
    }, []);
    console.log(dataSource);
    useEffect(() => {}, []);
    return (
      <React.Fragment>
        <div className="master-detail-caption">{}</div>
        <DataGrid
          dataSource={dataSource}
          showBorders={true}
          columnAutoWidth={true}
        >
          <Column dataField="Sku" />
          <Column dataField="Name" />
          <Column dataField="Quant" />
          <Column dataField="Sum" />
          <Column dataField="Comment" />
        </DataGrid>
      </React.Fragment>
    );
  };

  console.error(">>> ", localStorage.getItem("orderId"));
  const [shops, setShops] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [val, setVal] = useState({ shop: "", contact: "" });
  console.log(val);
  const [contact, setContact] = useState("");
  const [mailToSend, setMailToSend] = useState("");
  const [shopToSend, setShopToSend] = useState("");
  const send = async () => {
    // {"OrderId":"30dc661e-10cc-44fa-8e2b-46a8e944df29",
    //  "Quant":1,
    //  "sum":780,
    //     "product": {
    //         "id": "ef4baa40-3d27-412e-bff5-2462016b6d68"
    //     },
    //  "comment":""},

    let bodyParameters = {
      vendorId: localStorage.getItem("vendorId"),
      number: "",
      shopId: contacts.find((shop) => shop.name === contact).id,
      comment: "11111",
      eMailSend: "",
    };
    let output = [];

    let gc = getCart();
    console.log(">>", gc);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        User: `${localStorage.getItem("login")}`,
      },
    };
    try {
      const data = await axios.post(
        `http://194.87.239.231:55555/api/order`,
        bodyParameters,
        config
      );

      localStorage.setItem("orderId", data.data.id);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    bodyParameters = {
      vendorId: localStorage.getItem("vendorId"),
      number: "",
      shopId: contacts.find((shop) => shop.name === contact).id,
      comment: "11111",
      eMailSend: contact,
    };

    for (let obj of orderF) {
      console.log(obj, gc);
      output.push({
        OrderId: localStorage.getItem("orderId"),
        Quant: obj[Object.keys(obj)[0]],
        sum: Object.keys(obj)[0].split("::")[2],
        product: {
          id: Object.keys(obj)[0].split("::")[0],
        },
        comment: "",
      });
    }

    try {
      await axios.post(
        `http://194.87.239.231:55555/api/ordercontent`,
        output,
        config
      );
    } catch (e) {
      console.log(e);
    }
    const mailToSend = val["contact"];
    const shopToSend = val["shop"];
    console.log(shops, shop);
    console.log(val);
    bodyParameters = {
      OrderId: localStorage.getItem("orderId"),
      EMailList: mailToSend,
      ShopId: shops.find((myshop) => myshop.name === shop).id,
    };
    try {
      const data = await axios.put(
        `http://194.87.239.231:55555/api/orderSend`,
        bodyParameters,
        config
      );

      localStorage.setItem("orderId", data.data.id);
    } catch (e) {
      console.log(e);
    }
    setCart({});
    setIsReadyForOrder(false);
    setOrderF([]);
  };
  const [sumArr, setSumArr] = useState({});
  const [detailedItem, setDetailedItem] = useState([]);
  const [detailedTable, setDetailedTable] = useState({});
  const showDetailedItem = async (e) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        User: `${localStorage.getItem("login")}`,
      },
    };
    const result = await axios.get(
      `http://194.87.239.231:55555/api/PriceImages/${e.key}`,
      config
    );
    const table = await axios.get(
      `http://194.87.239.231:55555/api/product/${e.key}`,
      config
    );
    console.warn(table);
    setDetailedTable(table.data.meta.json);
    setDetailedItem(result.data);
    setPopupVisible(true);
    console.log(detailedItem);
  };
  const [popupVisible, setPopupVisible] = useState(false);
  const handlePopupHidden = useCallback(() => {
    setPopupVisible(false);
  }, []);

  // useEffect(() => {
  //   async function exec()
  //   {
  //   if(popupVisible)
  //     {
  //       await axios.get(`http://194.87.239.231:55555/api/product/${}`)
  //     }
  //   }
  // }, [popupVisible])

  // {{base_url}}/api/product/eb22e226-af53-4396-8ed6-2819a9531d7e

  const columnsDetailed =
    src &&
    src.profile.columns.map((column, idx) => (
      <Column
        dataField={column.code}
        width={190}
        caption={column.name}
        hidingPriority={idx}
      />
    ));
  let resultDetailedTable = [];
  for (let key in detailedTable) {
    resultDetailedTable.push(
      <tr>
        <td>{key}</td>
        <td>{detailedTable[key]}</td>
      </tr>
    );
  }
  const renderPopup = () => {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div>
            {detailedItem.length ? (
              <img src={"data:image/png;base64," + detailedItem[1].photo} />
            ) : null}{" "}
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Значение</th>
                </tr>
              </thead>
              <tbody>{resultDetailedTable}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  console.log(detailedTable);
  const [shop, setShop] = useState("");
  const [mail, setMail] = useState("");
  return (
    <React.Fragment>
      <Tabs
        id="withText"
        defaultSelectedIndex={0}
        dataSource={tabsText}
        onItemClick={changeTab}
      />
      {tab === 0 && (
        <>
          <h2 className={"content-block"}>Прайс-лист</h2>
          <button style={{ margin: "5px" }} onClick={() => operation(+1)}>
            +
          </button>
          <button onClick={() => operation(-1)}>-</button>
          <br />
          <div style={{ margin: "5px" }}>
            {"Количество наименованийв к корзине: "}
            {Object.keys(cart).length}
          </div>
          {src && Object.values(src).length && (
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
              onRowDblClick={(e) => showDetailedItem(e)}
              //   onSelectionChanged={onSelectionChanged}
              onRowPrepared={cellPrepared}
            >
              <SearchPanel visible={true} width={240} placeholder="Search..." />
              <Paging defaultPageSize={10} />
              <Pager showPageSizeSelector={true} showInfo={true} />
              <FilterRow visible={true} />
              <GroupPanel visible={true} />
              {columns}
            </DataGrid>
          )}
        </>
      )}

      <Popup
        width={900}
        height={800}
        showTitle={true}
        title={detailedTable.name}
        dragEnabled={false}
        hideOnOutsideClick={true}
        visible={popupVisible}
        onHiding={handlePopupHidden}
        contentRender={renderPopup}
        showCloseButton={true}
      />
      {console.error(
        ">>>",
        orderF.sort(
          (a, b) =>
            Object.keys(a)[0].split("::")[0] > Object.keys(b)[0].split("::")[0]
        )
      )}
      {tab === 2 ? (
        <DataGrid
          id="grid-container"
          dataSource={ordersAll}
          keyExpr="id"
          showBorders={true}
        >
          <Column dataField="dateCreate" caption="Date creation" />
          <Column dataField="shopName" caption="ShopName" />
          <Column dataField="number" caption="Number" />
          <Column dataField="comment" caption="Comment" />
          <Column dataField="totalPrice" caption="total" />
          <Column dataField="orderPositions" dataType="Count" />
          <MasterDetail enabled={true} component={DetailTemplate} />
        </DataGrid>
      ) : null}

      {tab === 1 && orderF.length ? (
        <>
          {!isReadyForOrder ? (
            <div style={{ textAlign: "center" }}>
              <table>
                <tr>
                  <th scope="col">Название</th>
                  <th scope="col">Количество</th>
                  <th scope="col">Сумма</th>
                </tr>
                {orderF
                  .sort((a, b) =>
                    Object.keys(a)[0]
                      .split("::")[0]
                      .localeCompare(Object.keys(b)[0].split("::")[0])
                  )
                  .map((el) => (
                    <tr className="cart" key={el.id}>
                      <td className="cart__item_name">
                        {Object.keys(el)[0].split("::")[1]}
                      </td>
                      <td className="cart__item_desc">
                        {" "}
                        {/* <span onClick={}>+</span> {el[Object.keys(el)[0]]} <span>-</span>{" "} */}
                        {el[Object.keys(el)[0]]}
                      </td>
                      <td>
                        <input
                          type="text"
                          value={Object.keys(el)[0].split("::")[2]}
                          onChange={(e) => {
                            console.log(e);
                            let newK =
                              Object.keys(el)[0].split("::")[0] +
                              "::" +
                              Object.keys(el)[0].split("::")[1] +
                              "::" +
                              e.target.value;
                            let arr = [...orderF];
                            arr = arr.filter(
                              (item) =>
                                Object.keys(item)[0].split("::")[0] !==
                                Object.keys(el)[0].split("::")[0]
                            );
                            setOrderF([
                              ...arr,
                              { [newK]: el[Object.keys(el)[0]] },
                            ]);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </table>
              <button
                onClick={() => {
                  setIsReadyForOrder(true);
                  order();
                }}
                style={{ marginRight: "-415px", marginTop: "10px" }}
              >
                Заказать
              </button>
            </div>
          ) : (
            <div>
              <SelectBox
                items={shops.map((shop) => shop.name)}
                defaultValue={shops[0].name}
                onValueChanged={(e) => {
                  setVal({ ...val, shop: e.value });
                  setShop(e.value);
                }}
              />
              <SelectBox
                items={contacts.map((el) => el.name)}
                defaultValue={contacts.map((el) => el.name)[0]}
                onValueChanged={(e) => {
                  setVal({ ...val, contact: e.value });
                  setContact(e.value);
                }}
              />
              <TextBox
                defaultValue=""
                value={contact}
                onValueChanged={(e) => setVal({ ...orderF, contact: e.value })}
              />
              {/* <TextBox
                defaultValue=""
                value={shop}
                onValueChanged={(e) => setShop(e.value )}
              />
              <TextBox
                defaultValue=""
                value={mail}
                onValueChanged={(e) => setMail(e.value)}
              /> */}
              <input type="button" onClick={send} value="Отправить" />
            </div>
          )}
        </>
      ) : null}
      {tab === 1 && orderF.length === 0 ? (
        <div
          style={{
            margin: "0 auto",
            width: "200px",
            fontSize: "19px",
            marginTop: "40px",
          }}
        >
          Корзина пустая
        </div>
      ) : null}
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
