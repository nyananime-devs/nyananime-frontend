/* Base */
import { h, FunctionalComponent } from "preact";
import { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import { Link } from "preact-router";
import { Text, Localizer } from "preact-i18n";
/* Redux */
import { connect } from "react-redux";
import { mapState, mapDispatch } from "../../redux/util";
import * as actions from "../../redux/actions";
/* Styles */
import baseStyle from "../style.scss";
import style from "./style.scss";

const Login: FunctionalComponent<LoginConnectedProps> = (props: LoginConnectedProps) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        props.actions.setAuthResult("NONE");
    }, [true]);

    return (
        <div className={baseStyle["page-content"]}>
            <div className={style.auth}>
                <div className={style["auth-form"]}>
                    <div className={style["auth-title"]}>
                        <Text id="login.title" />
                    </div>
                    <Localizer>
                        <input
                            name="username"
                            placeholder={props.dictionary.login?.username.placeholder}
                            type="text"
                            className={style["auth-input"]}
                            onChange={(e) => {
                                setUsername(e.currentTarget.value);
                            }}
                            value={username}
                        />
                        <input
                            name="password"
                            placeholder={props.dictionary.login?.password.placeholder}
                            type="password"
                            className={style["auth-input"]}
                            onChange={(e) => {
                                setPassword(e.currentTarget.value);
                            }}
                            value={password}
                        />
                    </Localizer>
                    <Button secondary
                        className={style["auth-button"]}
                        onClick={() => {
                            if(username.length < 3) {
                                props.actions.setAuthResult("USERNAME_TOO_SHORT");
                            } else if(password.length < 3) {
                                props.actions.setAuthResult("PASSWORD_TOO_SHORT");
                            } else {
                                props.actions.createSession("classic", username, password);
                            }
                        }}>
                        <Text id="login.button" />
                    </Button>
                    {props.authResult === "NONE" ? null : <div className={style["auth-result-text"]}>{<Text id={`enum.authResult.${props.authResult}`} />}</div>}
                    <Link href="/register" className={style["auth-link"]}>
                        <Text id="login.noAccount" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default connect(mapState, mapDispatch(actions))(Login);
