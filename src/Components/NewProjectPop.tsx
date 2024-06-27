import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./NewProjectPop.css";

interface NewProjectPopProps {
  handleClose: () => void;
  open: boolean;
}

const NewProjectPop: React.FC<NewProjectPopProps> = ({ handleClose, open }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const { projectName, projectBudget, projectDeadline } = formJson;
            console.log(projectName, projectBudget, projectDeadline);
            handleClose();
          },
        }}>
        <DialogTitle>New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide information about project
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="projectName"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="budget"
            name="projectBudget"
            label="Project Budget"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="deadline"
            name="projectDeadline"
            label="Deadline"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export { NewProjectPop };
