import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

ja.options.weekStartsOn = 0;
registerLocale("ja", ja);

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      formInview: false,
      inputStart: new Date(),
      inputEnd: new Date(),
      inputshoppingStart: new Date(),
      // inputshoppingEnd: new Date(),
      inputTitle: "",
      inputMemo: "",
      inputMoney:"",
      inputsstart:"",
      isInputTitle: false,
      isChange: false,
    };
    this.myEvents = [
      {
        id: 0,
        title: "event 1",
        start: "2022-11-22 10:00:00",
        end: "2022-11-22 12:00:00",
        memo: "memo1",
      },
      {
        id: 1,
        title: "event 2",
        start: "2022-11-23 10:00:00",
        end: "2022-11-23 12:00:00",
        memo: "memo2",
      },
    ];
    this.EVENT_SEL_NON = 0xffff;
    this.selEventID = this.EVENT_SEL_NON;
    this.onAddEvent = this.onAddEvent.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onDeleteEvent = this.onDeleteEvent.bind(this);
  }
  render() {
    // console.log(this.myEvents);
    return (
      <div>
        <div className="container">
          <FullCalendar
            locale="ja" // 日本語
            defaultView="timeGridWeek" // 基本UI
            
            slotDuration="00:30:00" // 表示する時間軸の最小値
            
            selectable={true} // 日付選択可能
            
            allDaySlot={false} // alldayの表示設定
            
            headerToolbar ={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5],
              startTime: "0:00",
              endTime: "24:00",
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.ref}
            weekends={true} // 週末表示
            events={this.myEvents} // 起動時に登録するイベント
            eventClick={this.handleClick} // イベントクリック時
            select={this.handleSelect} // カレンダー範囲選択時
          />
        </div>
        {/* {this.renderCover()} */}
        {this.renderForm()}
      </div>
    );
  }
  //--------------
  // カレンダー関連
  //--------------
  handleSelect = (selectInfo) => {
    let start = new Date(selectInfo.start);
    let end = new Date(selectInfo.end);
    let sstart = new Date(selectInfo.start)
    sstart.setHours(sstart.getHours())
    start.setHours(start.getHours());
    end.setHours(end.getHours());

    this.setState({ inputTitle: "" });
    this.setState({ inputMemo: "" });
    this.setState({ inputMoney: "" });
    this.setState({ inputsstart:""});
    this.setState({ isInputTitle: false });
    this.setState({ inputStart: start });
    this.setState({ inputEnd: end });
    this.setState({ inputshoppingStart: start });
    // this.setState({ inputshoppingEnd: end });
    this.setState({ isChange: false });
    this.setState({ formInview: true });
  };

  handleClick = (info) => {
    this.selEventID = info.event.id;
    const selEvent = this.myEvents[info.event.id];
    const title = selEvent.title;
    const memo = selEvent.memo;
    const money = selEvent.money;
    const shostart = selEvent.shostart;
    const start = new Date(selEvent.start);
    const end = new Date(selEvent.end);
    const sstart = new Date(selEvent.sstart);
  

    this.setState({ inputTitle: title });
    this.setState({ inputMemo: memo });
    this.setState({ inputMoney: money });
    this.setState({ inputsstart: shostart });
    this.setState({ isInputTitle: true });
    this.setState({ inputStart: start });
    this.setState({ inputEnd: end });
    this.setState({ inputshoppingStart: sstart });
    // this.setState({ inputshoppingEnd: end });
    this.setState({ isChange: true });
    this.setState({ formInview: true });
  };

  //--------------
  // カバー関連
  //--------------
  renderCover() {
    return (
      <div
        onClick={() => {
          this.setState({ formInview: false });
        }}
        className={
          this.state.formInview
            ? "container__cover inview"
            : "container__cover "
        }
      ></div>
    );
  }
  //--------------
  // フォーム関連
  //--------------
  renderForm() {
    return (
      <div
        className={
          this.state.formInview ? "container__form inview" : "container__form"
        }
      >
        <form>
          {this.state.isChange === false ? (
            <div className="container__form__header">予定を入力</div>
          ) : (
            <div className="container__form__header">予定を変更</div>
          )}

          <div>{this.renderTitle()}</div>
          <div>{this.renderStartTime()}</div>
          <div>{this.renderEndTime()}</div>
          <div>{this.rendershoppingTime()}</div>
          {/* <div>{this.rendershoppingendTime()}</div> */}
          <div>{this.renderMoney()}</div>
          <div>{this.rendershostart()}</div>
          <div>{this.renderMemo()}</div>
          <div>{this.renderBtn()}</div>
        </form>
      </div>
    );
  }
  renderTitle() {
    return (
      <React.Fragment>
        <p className="container__form__label">タイトル</p>
        <input
          className="container__form__title"
          type="text"
          value={this.state.inputTitle}
          onChange={(e) => {
            this.setState({ inputTitle: e.target.value });

            if (e.target.value === "") {
              this.setState({ isInputTitle: false });
            } else {
              this.setState({ isInputTitle: true });
            }
          }}
        />
      </React.Fragment>
    );
  }
  renderMoney() {
    return (
      <React.Fragment>
        <p className="container__form__label">必要金額</p>
        <textarea
          className="container__form__memo"
          rows="1"
          value={this.state.inputMoney}
          onChange={(e) => {
            this.setState({ inputMoney: e.target.value });
          }}
        />
      </React.Fragment>
    );
  }
  rendershostart() {
    return (
      <React.Fragment>
        <p className="container__form__label">必要金額</p>
        <textarea
          className="container__form__memo"
          rows="1"
          value={this.state.inputsstart}
          onChange={(e) => {
            this.setState({ inputsstart: e.target.value });
          }}
        />
      </React.Fragment>
    );
  }
  renderMemo() {
    return (
      <React.Fragment>
        <p className="container__form__label">メモ</p>
        <textarea
          className="container__form__memo"
          rows="3"
          value={this.state.inputMemo}
          onChange={(e) => {
            this.setState({ inputMemo: e.target.value });
          }}
        />
      </React.Fragment>
    );
  }
  renderStartTime() {
    return (
      <React.Fragment>
        <p className="container__form__label">開始日時</p>
        <DatePicker
          className="container__form__datetime"
          locale="ja"
          dateFormat="yyyy/MM/d HH:mm"
          selected={this.state.inputStart}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          todayButton="today"
          onChange={(time) => {
            this.setState({ inputStart: time });
          }}
        />
      </React.Fragment>
    );
  }
  renderEndTime() {
    return (
      <React.Fragment>
        <p className="container__form__label">終了日時</p>
        <DatePicker
          className="container__form__datetime"
          locale="ja"
          dateFormat="yyyy/MM/d HH:mm"
          selected={this.state.inputEnd}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          todayButton="today"
          onChange={(time) => {
            this.setState({ inputEnd: time });
          }}
        />
      </React.Fragment>
    );
  }
  rendershoppingTime() {
    return (
      <React.Fragment>
        <p className="container__form__label">物販開始時刻</p>
        <DatePicker
          className="container__form__datetime"
          locale="ja"
          dateFormat="MM/d HH:mm"
          selected={this.state.inputshoppingStart}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={10}
          todayButton="today"
          onChange={(time) => {
            this.setState({ inputshoppingStart: time });
          }}
        />
      </React.Fragment>
    );
  }
  // rendershoppingendTime() {
  //   return (
  //     <React.Fragment>
  //       <p className="container__form__label">物販終了時刻</p>
  //       <DatePicker
  //         className="container__form__datetime"
  //         locale="ja"
  //         dateFormat="MM/d HH:mm"
  //         selected={this.state.inputshoppingEnd}
  //         showTimeSelect
  //         timeFormat="HH:mm"
  //         timeIntervals={10}
  //         todayButton="today"
  //         onChange={(time) => {
  //           this.setState({ inputshoppingEnd: time });
  //         }}
  //       />
  //     </React.Fragment>
  //   );
  // }
  renderBtn() {
    return (
      <div>
        {this.state.isChange === false ? (
          <div>
            <input
              className="container__form__btn_cancel"
              type="button"
              value="キャンセル"
              onClick={() => {
                this.setState({ formInview: false });
              }}
            />
            <input
              className="container__form__btn_save"
              type="button"
              value="保存"
              disabled={!this.state.isInputTitle}
              onClick={this.onAddEvent}
            />
          </div>
        ) : (
          <div>
            <input
              className="container__form__btn_delete"
              type="button"
              value="削除"
              onClick={this.onDeleteEvent}
            />
            <input
              className="container__form__btn_save"
              type="button"
              value="変更"
              onClick={this.onChangeEvent}
            />
          </div>
        )}
      </div>
    );
  }
  //--------------
  // イベント関連
  //--------------
  getdoubleDigestNumer(number) {
    return ("0" + number).slice(-2);
  }
  changeDateToString(dt) {
    const year = dt.getFullYear();
    const month = this.getdoubleDigestNumer(dt.getMonth() + 1);
    const date = this.getdoubleDigestNumer(dt.getDate());
    const hour = this.getdoubleDigestNumer(dt.getHours());
    const minutes = this.getdoubleDigestNumer(dt.getMinutes());

    const retDate = `${year}-${month}-${date} ${hour}:${minutes}:00`;
    return retDate;
  }
  onAddEvent() {
    const starttime = this.changeDateToString(this.state.inputStart);
    const endtime = this.changeDateToString(this.state.inputEnd);
    const shoppingtime = this.changeDateToString(this.state.inputshoppingStart);

    if (starttime >= endtime) {
      alert("開始時間と終了時間を確認してください。");
      return;
    }
    const event = {
      title: this.state.inputTitle,
      memo: this.state.inputMemo,
      money:this.state.inputMoney,
      start: starttime,
      end: endtime,
      shoppingtime:shoppingtime,
    };
    if (this.addEvent(event) === true) {
      window.alert("設定しました");
      this.setState({ formInview: false });
    }
  }
  onChangeEvent(values) {
    if (window.confirm("変更しますか？")) {
      const starttime = this.changeDateToString(this.state.inputStart);
      const endtime = this.changeDateToString(this.state.inputEnd);
      const shoppingtime = this.changeDateToString(this.state.inputshoppingStart);

      if (starttime >= endtime) {
        alert("開始時間と終了時間を確認してください。");
        return;
      }

      const event = {
        title: this.state.inputTitle,
        memo: this.state.inputMemo,
        money:this.state.inputMoney,
        start: starttime,
        end: endtime,
        shoppingtime:shoppingtime,
        id: this.selEventID,
      };
      if (this.changeEvent(event) === true) {
        window.alert("イベントを変更しました。");
        this.setState({ formInview: false });
      }
    } else {
      return;
    }
  }
  onDeleteEvent(values) {
    if (window.confirm("削除しますか？")) {
      if (this.selEventID < this.EVENT_SEL_NON) {
        let EventID = this.selEventID;
        let delevent = this.ref.current.getApi().getEventById(EventID);
        delevent.remove();
        this.selEventID = this.EVENT_SEL_NON;
        this.myEvents[EventID].isDel = true;
      }
      this.setState({ formInview: false });
      alert("イベントを削除しました。");
    } else {
      return;
    }
  }
  addEvent = (ev, col) => {
    ev.id = this.getID();
    this.myEvents.push(ev);
    this.ref.current.getApi().addEvent(ev);

    return true;
  };
  changeEvent = (ev, col = "red") => {
    this.myEvents[ev.id].title = ev.title;
    this.myEvents[ev.id].memo = ev.memo;
    this.myEvents[ev.id].start = ev.start;
    this.myEvents[ev.id].end = ev.end;
    this.myEvents[ev.id].money = ev.money;

    this.ref.current.getApi().getEventById(ev.id).remove();
    this.ref.current.getApi().addEvent(this.myEvents[ev.id]);

    return true;
  };
  sortEventID = (a, b) => {
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  };
  getID = () => {
    this.myEvents.sort(this.sortEventID);
    let i;
    for (i = 0; i < this.myEvents.length; i++) {
      if (this.myEvents[i].id !== i) {
        break;
      }
    }
    return i;
  };
}

export default App;