import React from "react";
import {
    useMultiChatLogic,
    MultiChatSocket,
    MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "../customHeader";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import Ai from "../customMessageForms/Ai";
import AiCode from "../customMessageForms/AiCode";
import AiAssist from "../customMessageForms/AiAssist";

const Chat = ({ user, secret }) => {
    const chatProps = useMultiChatLogic(
        "38ad9b0e-2cc1-47c8-9f83-e3c01e657de6",
        user,
        secret
    );

    return (
        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <Header chat={chat} />}
                renderMessageForm={(props) => {
                    if (chatProps.chat?.title.startsWith("AiChat_")) {
                        return <Ai props={props} activeChat={chatProps.chat} />;
                    }
                    if (chatProps.chat?.title.startsWith("AiCode_")) {
                        return (
                            <AiCode props={props} activeChat={chatProps.chat} />
                        );
                    }
                    if (chatProps.chat?.title.startsWith("AiAssist_")) {
                        return (
                            <AiAssist
                                props={props}
                                activeChat={chatProps.chat}
                            />
                        );
                    }

                    return (
                        <StandardMessageForm
                            props={props}
                            activeChat={chatProps.chat}
                        />
                    );
                }}
            />
        </div>
    );
};

export default Chat;
