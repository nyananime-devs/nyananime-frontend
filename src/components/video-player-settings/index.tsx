/* Base */
import { h, FunctionalComponent } from "preact";
/* Styles */
import tooltipStyle from "../tooltip.scss";
import style from "./style.scss";
import switchStyle from "../switch.scss";

const VideoPlayerSettings: FunctionalComponent<VideoPlayerSettingsConnectedProps> = (props: VideoPlayerSettingsConnectedProps) => {
    return (
        <div className={style["episode-video-settings"]}>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-quality"]} />
                Quality
                <div className={style["episode-video-settings-item-option"]} data="margin">
                    {[
                        { level: -1, type: "auto", name: "Automatic" },
                        { level: 2, type: "high", name: "1080p ᴴᴰ" },
                        { level: 1, type: "med", name: "720p" },
                        { level: 0, type: "low", name: "480p" }
                    ].map((e, i) => (
                        <div key={i} className={[tooltipStyle["tooltip-wrapper"], style["option-flag-wrapper"]].join(" ")} data={props.playerData.manifest.level === e.level ? "selected" : undefined}>
                            <img
                                src={`/assets/icons/ui/quality_${e.type}.svg`}
                                width={20}
                                height={20}
                                onClick={() => {
                                    props.actions.setPlayerManifestLevel(e.level);
                                }}
                            />
                            <div className={tooltipStyle.tooltip} data="no-arrow">
                                {e.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-audio"]} />
                Audio
                <div className={style["episode-video-settings-item-option"]} data="margin">
                    {(props.playerData.manifest.audio.length === 0
                        ? props.item.audio.map((e) => {
                              return { lang: e, name: e };
                          })
                        : props.playerData.manifest.audio
                    ).map((e, i) => (
                        <div key={i} className={[tooltipStyle["tooltip-wrapper"], style["option-flag-wrapper"]].join(" ")} data={e.lang === props.playerData.audio.lang ? "selected" : undefined}>
                            <img
                                src={`/assets/icons/flags/${e.lang}.svg`}
                                width={20}
                                height={20}
                                onClick={() => {
                                    props.actions.setPlayerAudio({ lang: e.lang });
                                }}
                            />
                            <div className={tooltipStyle.tooltip} data="no-arrow">
                                {e.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-subs"]} />
                Subtitles
                <div className={style["episode-video-settings-item-option"]} data="margin">
                    {(props.playerData.manifest.subtitles.length === 0
                        ? props.item.subtitles.map((e) => {
                              return { lang: e, name: e };
                          })
                        : props.playerData.manifest.subtitles
                    ).map((e, i) => (
                        <div key={i} className={[tooltipStyle["tooltip-wrapper"], style["option-flag-wrapper"]].join(" ")} data={e.lang === props.playerData.subs.lang ? "selected" : undefined}>
                            <img
                                src={`/assets/icons/flags/${e.lang}.svg`}
                                width={20}
                                height={20}
                                onClick={() => {
                                    props.actions.setPlayerSubs({ enabled: true, lang: e.lang });
                                }}
                            />
                            <div className={tooltipStyle.tooltip} data="no-arrow">
                                {e.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style["episode-video-settings-item"]}>
                <div className={style["icon-debug"]} />
                Debug
                <div className={style["episode-video-settings-item-option"]}>
                    <div
                        className={switchStyle.switch}
                        style={{ transform: "scale(0.65)" }}
                        onClick={() => {
                            props.actions.setPlayerOverlay(!props.playerData.overlay);
                        }}>
                        <input type="checkbox" checked={props.playerData.overlay} />
                        <div className={switchStyle["switch-slider"]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerSettings;
