import { mergeStyleSets } from "@fluentui/react";
import { IProcessedStyleSet, IStyle } from "@fluentui/react/lib/Styling";


interface IHomeStyle {
    todoContainer : IStyle;
    headerStyle : IStyle;
    pivotRoot: IStyle;
    pivotContainer: IStyle;
}

const HomeStyle: IProcessedStyleSet<IHomeStyle> = mergeStyleSets({
    todoContainer : {
        width: "50%",
        height: "80%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        //properties that use a dash must be written in camelCase
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    },
    headerStyle: {
        height: 80,
        backgroundColor: "OliveDrab",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    pivotRoot: {
        display: "flex", 
        justifyContent: "space-around",
    },
    pivotContainer: {
        margin: 20,
    }
})

export default HomeStyle;