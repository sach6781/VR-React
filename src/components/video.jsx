import { default as React, PropTypes } from 'react';

const noop = () => {};

class Video extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            webGl: null,
            devices: null,
            needReload: false
        };
    }

    render() {
        return (
            <div>
                <canvas className="glcanvas" ref="canvas">
                    Your browser doesn't appear to support the HTML5 <code>&lt;canvas&gt;</code> element.
                </canvas>
                <video preload="false" className="video" loop="true" webkit-playsinline ref="video" style={{height: 200}}>
                    { this.props.sources.map(s => <source src={s.url} type={s.type} key={s.url} />)}
                </video>
            </div>
        );
    }

    componentWillMount() {

    }



    componentWillReceiveProps(newProps){
        if (this.props.sources != newProps.sources){
            this.updateSources();
        }
    }

    componentDidUpdate(){
        if (this.state.needReload){
            console.log('Reloading video');
            const video = this.refs.video;
            const webGl = this.state.webGl;
            video.load();
            webGl.draw();
            this.setState({needReload: false});
        }
    }

    componentWillUnmount(){
        const webGl = this.state.webGl;
        if (webGl){
            webGl.stop();
        }
    }

    playPause() {
        const video = this.refs.video;
        const webGl = this.state.webGl;
        if (video.paused) {
            video.play();
            webGl.draw();
        } else {
            video.pause();
        }
        this.props.onPlayPause(!video.paused);
    }

    toggleMute() {
        const video = this.refs.video;
        video.muted = !video.muted;
        this.props.onMute(video.muted);
    }

    setPosition(percentage) {
        const video = this.refs.video;
        const time = video.duration * percentage / 100;
        video.currentTime = time;
        this.props.onPositionChange(percentage);
    }

    zeroSensor(){
        const devices = this.state.devices;
        if (devices.sensor) {
            devices.sensor.zeroSensor();
        }
    }

    updateSources () {
        const video = this.refs.video;
        const webGl = this.state.webGl;
        video.pause();
        webGl.stop();
        this.props.onPlayPause(!video.paused);
        this.props.onPositionChange(0);
        this.setState({needReload: true});
    }
}

Video.propTypes = {
    sources: PropTypes.array.isRequired,
    onFullscreen: PropTypes.func,
    onPositionChange: PropTypes.func,
    onPlayPause: PropTypes.func,
    onMute: PropTypes.func,
    keys: PropTypes.object
};

Video.defaultProps = {
    sources: [],
    onFullscreen: noop,
    onPositionChange: noop,
    onPlayPause: noop,
    onMute: noop,
    keys: {
        left: 'A',
        right: 'D',
        up: 'W',
        down: 'S',
        rotateLeft: 'Q',
        rotateRight: 'E',
        fullScreen: 'F',
        zeroSensor: 'Z',
        playPause: ' '
    }
};

export default Video;