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
    "# Jesse Kim\n" +
    "- 데이터 사이언스, 인공지능, 머신 러닝을 공부하는 학생입니다.\n" +
    "- 서울대학교 경영학과에 재학 중입니다.\n" +
    "- 창업에 관심이 많고, 실제로 했던 적이 있습니다.\n" +
    "- Email: [jessekim.ck.94@gmail.com](mailto:jessekim.ck.94@gmail.com)\n" +
    "- Github: https://github.com/weekendkim\n" +
    "\n" +
    "## 블로그 사용법\n" +
    "- 오른쪽 상단 로고를 누르면 사이드바를 소환합니다.\n" +
    "- 사이드바에서 포스트를 탐색할 수 있습니다.\n" +
    "- 사이드바에서 `ctrl`나 `cmd` 키를 누른 채 카테고리를 클릭하면 해당 카테고리 페이지로 이동합니다.\n" +
    "- `ctrl/cmd` + `l`: 사이드바를 소환합니다.\n" +
    "- `ctrl/cmd` + `h`: 포스트 목록 페이지로 이동합니다.";

    render() {
        return (
            <div style={{fontSize: "16px"}}>
                <MarkdownRenderer source={this.source} />
            </div>
        );
    }
}

export default connect()(About);
