import styled from "styled-components";
import JSONToCSV  from 'react-json-to-csv';
import { MODAL_MSG } from "../../../constants";


export const JsonToCSV = styled(JSONToCSV)`
    visibility: hidden;
    :after{
        visibility: visible;
        content: '${MODAL_MSG.btnMsg}';
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #cccccc;
        padding: 9px;
        color: white;
        margin-right: 40px;
        margin-left: -90px;
    }      
`

