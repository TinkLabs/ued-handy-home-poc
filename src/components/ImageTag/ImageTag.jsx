import * as React from "react";
import t from "translation/translate";

export default class ImageTag extends React.Component {
    render() {
        if (this.props.text) {
            const { isChinese, text, locale } = this.props;
            const className = `image-tag-container ${(isChinese) ? "image-tag-zh" : ""}`;
            const tag = (isChinese) ? t(text, locale) : text.toUpperCase();
            return (
                <div
                    className={className}
                    style={this.props.style}
                >
                    <span className="image-tag-text">
                        {tag}
                    </span>
                </div>
            )
        } else {
            return null;
        }
    }
}