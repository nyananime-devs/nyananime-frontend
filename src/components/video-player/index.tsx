/* Base */
import { h, Component } from "preact";
import { episodeLocationToURL } from "../../scripts/comfy/constants";
import { findSegmentForTimestamp } from "../../scripts/comfy/segment";
/* Styles */
import style from "./style.scss";
/* Components */
import VideoPlayerControls from "../video-player-controls";
import VideoPlayerOverlay from "../video-player-overlay";
import VideoPlayerNotification from "../video-player-notification";
import VideoPlayerHlsWrapper from "../video-player-hls-wrapper";
import { SegmentTypeMapping } from "../../ts/common/const";
import VideoPlayerSettings from "../video-player-settings";

class VideoPlayer extends Component<VideoPlayerConnectedProps> {
    video: HTMLVideoElement | null = null;
    timelineTooltip: HTMLElement | null = null;
    timelineText: HTMLElement | null = null;
    timelineCanvas: HTMLCanvasElement | null = null;
    setVideoRef: any;
    setTimelineTooltipRef: any;
    setTimelineTextRef: any;
    setTimelineCanvasRef: any;
    keyCallbackBinded: any;
    hadResumeProgress: boolean;

    constructor(props: VideoPlayerConnectedProps) {
        super(props);

        this.setVideoRef = (e: HTMLVideoElement | null) => {
            this.video = e;
            this.forceUpdate();
        };
        this.setTimelineTooltipRef = (e: HTMLElement | null) => {
            this.timelineTooltip = e;
            this.forceUpdate();
        };
        this.setTimelineTextRef = (e: HTMLElement | null) => {
            this.timelineText = e;
            this.forceUpdate();
        };
        this.setTimelineCanvasRef = (e: HTMLCanvasElement | null) => {
            this.timelineCanvas = e;
            this.forceUpdate();
        };
        this.keyCallbackBinded = this.keyCallback.bind(this);
        this.hadResumeProgress = this.props.preferences.progress.has(this.props.item.id);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.keyCallbackBinded);
        if (this.video !== null) {
            this.video.load();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.keyCallbackBinded);
    }

    componentWillUpdate(nextProps: Readonly<VideoPlayerConnectedProps>): void {
        if (this.props.item.id !== nextProps.item.id) {
            this.video?.pause();
            this.video?.load();
        }
    }

    keyCallback(e: KeyboardEvent) {
        if (this.video !== null) {
            switch (e.key) {
                case "k":
                case " ":
                    if (this.video.paused) {
                        this.video.play();
                    } else {
                        this.video.pause();
                    }
                    e.preventDefault();
                    break;

                case "ArrowLeft":
                    this.video.currentTime = Math.min(Math.max(this.video.currentTime - 5, 0), this.video.duration);
                    e.preventDefault();
                    break;

                case "ArrowRight":
                    this.video.currentTime = Math.min(Math.max(this.video.currentTime + 5, 0), this.video.duration);
                    e.preventDefault();
                    break;

                case "ArrowDown":
                    this.video.volume = Math.min(Math.max(this.video.volume + 0.05, 0), this.video.volume);
                    e.preventDefault();
                    break;

                case "ArrowUp":
                    this.video.volume = Math.min(Math.max(this.video.volume - 0.05, 0), this.video.volume);
                    e.preventDefault();
                    break;

                case "m":
                    this.video.muted = !this.video.muted;
                    e.preventDefault();
                    break;

                case "c":
                    this.props.actions.setPlayerSubs({ enabled: !this.props.playerData.subs.enabled, lang: this.props.playerData.subs.lang });
                    e.preventDefault();
                    break;

                case "t":
                    this.props.actions.setPlayerTheater(!this.props.playerData.theater);
                    e.preventDefault();
                    break;

                case "s":
                    this.props.actions.setPlayerSettings(!this.props.playerData.settings);
                    e.preventDefault();
                    break;

                case "f":
                    if (document.fullscreenElement === null) {
                        this.video.requestFullscreen();
                    } else {
                        document.exitFullscreen();
                    }
                    e.preventDefault();
                    break;

                case "i":
                    this.props.actions.setPlayerOverlay(!this.props.playerData.overlay);
                    e.preventDefault();
                    break;

                default:
                    break;
            }
        }
    }

    render() {
        const currentSegment = this.video === null ? { end: 0, item: null } : findSegmentForTimestamp(this.props.segments, this.video.currentTime);
        const hasResumeNotification = this.props.playerData.resumeNotification && this.hadResumeProgress;
        const hasOpNotification = !hasResumeNotification && this.props.playerData.opNotification && currentSegment.item !== null && currentSegment.item.type === SegmentTypeMapping.OP;
        const hasEdNotification = !hasResumeNotification && this.props.playerData.edNotification && currentSegment.item !== null && currentSegment.item.type === SegmentTypeMapping.ED;

        return (
            <div className={style["episode-video-wrapper"]} data={this.props.playerData.theater ? "true" : "false"}>
                <video
                    ref={this.setVideoRef}
                    crossOrigin="cross-origin"
                    preload="metadata"
                    className={style["episode-video"]}
                    controls={document.fullscreenElement !== null}
                    onPlay={() => {
                        this.forceUpdate();
                    }}
                    onPause={() => {
                        this.forceUpdate();
                    }}
                    onTimeUpdate={() => {
                        const time = Math.round(this.video?.currentTime ?? 0);
                        if (time > 30 && this.props.preferences.progress.get(this.props.item.id) !== time) {
                            this.props.actions.setPreferencesProgress(this.props.item.id, time);
                        }
                        this.forceUpdate();
                    }}
                    onVolumeChange={() => {
                        this.forceUpdate();
                    }}
                    onLoadedMetadata={() => {
                        this.forceUpdate();
                    }}
                    onLoadedData={() => {
                        this.props.actions.setPlayerState("DONE");
                    }}
                    volume={this.props.preferences.volume} />
                <VideoPlayerControls
                    dimensions={this.props.dimensions}
                    playerData={this.props.playerData}
                    video={this.video}
                    timelineTooltip={this.timelineTooltip}
                    timelineText={this.timelineText}
                    timelineCanvas={this.timelineCanvas}
                    item={this.props.item}
                    encode={this.props.encode}
                    parent={this.props.parent}
                    segments={this.props.segments}
                    preferences={this.props.preferences}
                    actions={this.props.actions}
                />
                <div ref={this.setTimelineTooltipRef} className={style["episode-timeline-tooltip"]}>
                    <canvas className={style["episode-timeline-tooltip-canvas"]} ref={this.setTimelineCanvasRef} id="canvas" width={192} height={108} />
                    <div className={style["episode-timeline-tooltip-text"]} ref={this.setTimelineTextRef} />
                </div>
                {hasOpNotification ? <VideoPlayerNotification type={"OP"} time={currentSegment.end} video={this.video} actions={this.props.actions} /> : null}
                {hasEdNotification ? <VideoPlayerNotification type={"ED"} time={currentSegment.end} video={this.video} actions={this.props.actions} /> : null}
                {hasResumeNotification ? <VideoPlayerNotification type={"RESUME"} time={this.props.preferences.progress.get(this.props.item.id) ?? 0} video={this.video} actions={this.props.actions} /> : null}
                <VideoPlayerOverlay state={this.props.playerData.state} />
                {!this.props.playerData.settings ? null : <VideoPlayerSettings item={this.props.item} encode={this.props.encode} actions={this.props.actions} playerData={this.props.playerData} />}
                <VideoPlayerHlsWrapper item={this.props.item} parent={this.props.parent} video={this.video} preferences={this.props.preferences} actions={this.props.actions} playerData={this.props.playerData} />
            </div>
        );
    }
}

export default VideoPlayer;
