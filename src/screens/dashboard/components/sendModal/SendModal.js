import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  withHandlers,
  withStateHandlers,
  withProps,
  withState,
  withPropsOnChange,
  mapProps
} from "recompose";
import {
  firebaseConnect,
  firestoreConnect,
  withFirestore,
  isLoaded,
  isEmpty
} from "react-redux-firebase";

//actions
import viewModal from "../../../../functions/actions/viewModal";


const enhance = compose(
  withFirestore,
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
  firestoreConnect(({ auth }) => [
    {
      collection: "users"
    },
  ]),
  connect(
    ({ firestore }) => ({
      users: firestore.ordered.users,
    })
  ),
  withState('note', 'writeNote', ''),
  withState('receiver', 'changeReceiver', ''),
  withHandlers({
    sendBook: props => {
      props.firestore.add("userBooks", {
        sender: props.auth.uid,
        senderName: props.auth.displayName,
        inbox: true,
        book: props.view.book,
        user: props.receiver,
        note: props.note,
        sendDate: props.firestore.FieldValue.serverTimestamp(),
        journeyBook: {sender: props.auth.displayName, note: props.note}
      });
    },
    noteChange: props => event => {
      props.writeNote(event.target.value)
    },
    receiverChange: props => e => (
      props.changeReceiver(e.target.value)
    )
  }),
);


const SendModal = (props) => {
  return (
    <div className="SendModal">
      <div className="SendForm">
        <div className="SendForm-search">
          <input id="send-friend-input" placeholder="Type in your friend’s name" id="SendForm-search-input" value={props.receiver} onChange={(e)=>props.receiverChange(e)} />
        </div>
        {
        !isLoaded(props.users)
          ? 'LOAD'
          : isEmpty(props.users)
            ? 'EMPTY'
            : (
              props.users.filter(receiver => receiver.displayName.toLowerCase().includes(props.receiver.toLowerCase())).map((user) =>
              
              console.log(user)            )
            )
        }
        <div className="SendForm-note">
          <textarea id="send-note-input" placeholder="Add a short note" id="SendForm-note-input" value={props.note} onChange={(e)=>props.noteChange(e)} />
        </div>
      </div>
      <div className="ReceiveModal-actions mbtn-container">
        <button className="mbtn mbtn-cancel" onClick={()=>props.dispatch(viewModal())} >Cancel</button>
        <button className="mbtn mbtn-confirm" onClick={(e)=>{
          if (props.note != "") {
            props.sendBook();
            props.dispatch(viewModal());
          }
        }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default enhance(SendModal);
