import { Button } from "@mui/material";
import React, { useState } from "react";
import SummaryDialog from "../Dialogs/SummaryDialog/SummaryDialog";

export default function Summary() {
    const [summaryDialogVisibility, setSummaryDialogVisibility] = useState(false)
    return (
        <div>
            <Button variant="contained" onClick={() => setSummaryDialogVisibility(true)}>Get summary</Button>
            <SummaryDialog open={summaryDialogVisibility} setOpen={setSummaryDialogVisibility} />
        </div>
    );
}
