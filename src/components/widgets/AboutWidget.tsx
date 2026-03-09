import styles from "../../style";
import { ReactElement } from "react";

interface AboutWidgetProps {
    id: number | string;
    title: string | ReactElement;
    content: string | ReactElement;
    titleAdditionnalStyle?: string;
    contentStyle?: string;
}

const AboutWidget = ({ id, title, content, titleAdditionnalStyle, contentStyle }: AboutWidgetProps) => {

    return (
        <div id={`about-widget-${id}`}
            className={`
                ${styles.widgetCard}
                px-6 py-4
                h-full
                ${styles.flexCol}
                shadow-md
            `}
        >
            <h3 id={`about-widget-${id}-title`}
                className={`
                    font-primary-semibold
                    ${titleAdditionnalStyle}
                `}
            > {title} </h3>
            
            <div id={`about-widget-${id}-content`}
                className={`
                    ${contentStyle}
                    flex-1
                    relative
                `}
            > {content} </div>
        </div>
    )
}

export default AboutWidget;