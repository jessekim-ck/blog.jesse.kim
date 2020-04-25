import React from "react";
import MarkdownRenderer from "../components/MarkdownRenderer";
import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";


class About extends React.Component {

    componentDidMount() {
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    source = "" +
    "## Jesse Kim\n" +
    "- Learning Data Science, Artificial Intelligence and Deep Learning.\n" +
    "- Interested in technology, science and startup.\n" +
    "- Student @ business school of Seoul National Univerity\n" +
    "- Previous COO @ [Minding](https://minding.today)\n" +
    "- Researcher @ [mAy-I](https://may-i.io)\n" +
    "- Email: [jessekim.ck.94@gmail.com](mailto:jessekim.ck.94@gmail.com)\n" +
    "- Github: https://github.com/jessekim-ck\n" +
    "\n" +
    "## Blog Manual\n" +
    "- Click top right logo for sidebar menu.\n" +
    "- Browse categories & posts with sidebar.\n" +
    "- Click category with `ctrl` or `cmd` button pushed to move to that category page.\n" +
    "- `ctrl/cmd` + `;`: Open sidebar.\n" +
    "- `ctrl/cmd` + `h`: Move to home.";

    render() {
        return (
            <div style={{fontSize: "16px"}}>
                <MarkdownRenderer source={this.source} />
            </div>
        );
    }
}

export default connect()(About);
