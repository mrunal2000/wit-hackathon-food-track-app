import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Portal } from 'react-portal';

class Overlay extends Component {
    static propTypes = {
        isOpened: PropTypes.bool,
        closeOnOutsideClick: PropTypes.bool,
        overlayClassName: PropTypes.string,
        contentClassName: PropTypes.string,
        children: PropTypes.node,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        isAnimated: PropTypes.bool
    };

    static defaultProps = {
        isOpened: false,
        closeOnOutsideClick: true,
        overlayClassName: '',
        contentClassName: '',
        onOpen: () => {},
        onClose: () => {},
        isAnimated: false,
        children: null
    };
    constructor(props) {
        super(props);

        this.portal = null;
        this.content = null;

        this.state = {
            isOpened: this.props.isOpened
        };
    }

    componentDidMount() {
        if (this.props.isOpened === true) {
            this.onOpen();
        }
    }

    componentDidUpdate = prevProps => {
        const { isOpened: prevIsOpened } = prevProps;
        const { isOpened } = this.props;

        if (prevIsOpened !== isOpened) {
            this.setState({ isOpened });
            if (isOpened) {
                this.onOpen();
            }
            else {
                this.onClose();
            }
        }
    }

    componentWillUnmount() {
        this.onClose();
    }

    onOpen = () => {
        if (document) {
            document.body.classList.add('overlayContentOpen')
        }
        this.props.onOpen();
    };

    onClose = () => {
        if (document) {
            document.body.classList.remove('overlayContentOpen')
        }
        else {
            this.props.onClose();
        }
    };

    handleMouseClickOutside = e => {
        if (this.props.closeOnOutsideClick && e.target === this.content) {
            e.stopPropagation();

            this.setState({ isOpened: false });

            this.props.onClose();
        }
    };

    render() {
        const { isOpened } = this.state;
        const { isAnimated } = this.props;
        const overlayClassName = `overlay ${isAnimated ? 'animate' : ''} ${(isOpened && isAnimated) ? 'visible' : ''} ${this.props.overlayClassName}`

        if (isOpened || isAnimated) {
            return (
                <Portal
                    ref={ c => {
                        this.portal = c;
                    } }
                >
                    { /* disabling this rule as this element doesn't have any specific interaction role */ }
                    { /* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */ }
                    <div 
                        onClick={ this.handleMouseClickOutside }
                        ref={ content => (this.content = content) }
                        className={ overlayClassName }
                    >
                        <div className={ `content ${this.props.contentClassName}` }>
                            { this.props.children }
                        </div>
                    </div>
                </Portal>
            );
        }

        return null;
    }
}

export default Overlay;
