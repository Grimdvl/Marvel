import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundery extends Component {
    state = {
        error: false
    }

    //То же самое что и Component did catch
    // static getDerivedStateFromError(error) {
    //     return {error: true};
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>;
        }

        return this.props.children;
    }
}

export default ErrorBoundery;