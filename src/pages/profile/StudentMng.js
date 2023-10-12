import React, { useState, useEffect } from "react";
import {
    Typography,
    makeStyles,
    Box, Grid, Avatar,
    ChipTable,
    withStyles,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Divider,
    Button,
    FormControl,
    InputLabel,
    IconButton,
    Paper,
    Table,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { WorkOutlineRounded, Edit, Delete, AddCircleOutlineOutlined, Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
    Link,
    Route,
    Switch,
    useRouteMatch,
    withRouter,
} from "react-router-dom";
import { getListStudent } from "../../store/slices/classSlice";
import { get } from "lodash";
import { deleteStudent } from "../../store/slices/classSlice";
import { ModalConfirm, DatePickerForm, TextFieldForm, ModalInfor, AutocompleteSingle, AvatarImage } from "../../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createStudent, updateStudent } from "../../store/slices/classSlice";
import { postImageRequest } from "../../api/imageApi"

const tableCell = [
    "ID",
    "Name",
    "Avatar",
    "Email",
    "CCCD",
    "Gender",
    "Birthday",
    "Edit",
    "Delete",
];

const genderConstant = [
    "Male",
    "Female",
];

export default function StudentMng() {
    const classes = useStyles();
    const [openForm, setOpenForm] = useState(false);
    const [createOrUpdate, setCreateOrUpdate] = useState(null);
    const dispatch = useDispatch();
    const [openConfirmDelete, setConfirmDelete] = useState(false);
    const [id, setID] = useState();

    const selectorClass = useSelector((state) => get(state, "classStore.listStudent", {}))

    const listOfStudent = get(selectorClass, "list", [])
    const [getAvatar, setAvatar] = useState("");
    const [body, setBody] = useState({
        page: "",
        search: "",
        date__iexact: "",
    });

    const handleCapture = (e) => {
        const value = e.target.files[0];
        if (value)
            setAvatar({
                avatarPreview: URL.createObjectURL(value),
                avatarAsFile: value,
            });
    };

    useEffect(() => {
        dispatch(getListStudent(body));
    }, [body]);

    const {
        watch,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        let image = "";
        let formData = new FormData();
        try {
            if (getAvatar.avatarAsFile) {
                formData.append("image", getAvatar.avatarAsFile);
            } else image = getAvatar.avatarPreview;
        } catch (e) {
            image = "";
        }
        let tempDate = new Date(data?.birthday).toLocaleDateString('en-CA')
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("sex", data.sex === "Male" ? 1 : 2)
        formData.append("email", data.email)
        formData.append("birthday", tempDate)
        formData.append("CCCD", data.CCCD)
        if (!createOrUpdate) {
            setCreateOrUpdate(null);
            setOpenForm(false);


            await dispatch(
                createStudent({
                    data: formData,
                    cb: () => {
                        dispatch(getListStudent(body));
                    },
                })
            );
            setCreateOrUpdate(null);
            setOpenForm(false);
        }
        else {
            setCreateOrUpdate(null);
            setOpenForm(false);
            await dispatch(
                updateStudent({
                    CCCD: data.CCCD,
                    body: formData,
                    cb: () => {
                        dispatch(getListStudent(body));
                    },
                })
            );
        }
        reset({});
        setOpenForm(false);
    };

    const onOpenForm = (data) => {
        if (data) {
            setCreateOrUpdate(data);
            setAvatar({avatarPreview : data?.image})
        }
        else {
            setAvatar({avatarPreview : null})
            setCreateOrUpdate(null);
        }
        setOpenForm(true);
    };

    const onCloseForm = () => {
        setOpenForm(false);
        setCreateOrUpdate(null);
        reset({});
    };

    const onDelete = async (CCCD) => {
        setConfirmDelete(false);
        await dispatch(
            deleteStudent({
                CCCD: CCCD,
                cb: () => {
                    dispatch(getListStudent(body));
                },
            })
        );
    }

    const openDeleteModal = async (CCCD) => {
        setID(CCCD);
        setConfirmDelete(true)
    }

    const Form = ({ createOrUpdate }) => {
        // ìsetAvatar({avatarPreview: createOrUpdate.image})
        return (
            <ModalInfor open={openForm} handleClose={() => onCloseForm()}>
                <div className={classes.header}>
                    <Typography style={{ fontWeight: "bold", fontSize: 20 }}>
                        {createOrUpdate ? "Update student" : "Create new student"}
                    </Typography>
                    <IconButton
                        onClick={() => onCloseForm()}
                        size="small"
                        style={{ marginLeft: "auto" }}
                    >
                        <Close />
                    </IconButton>
                </div>
                <Divider />
                <form
                    autoComplete="off"
                    className={classes.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <AvatarImage
                            divClasses={classes.left__avt}
                            imgClasses={classes.avatar}
                            avtStyle={classes.avtStyle}
                            iconStyle={classes.iconStyle}
                            src={getAvatar}
                            toggle="true"
                            handleCapture={handleCapture}
                        />
                        <TextFieldForm
                            name="first_name"
                            control={control}
                            label="First name"
                            variant="outlined"
                            errors={errors.first_name}
                            formStyle={classes.formControl}
                            textFieldStyle={classes.textField}
                            defaultValue={createOrUpdate ? createOrUpdate.first_name : ""}
                        />
                        <TextFieldForm
                            name="last_name"
                            control={control}
                            label="Last name"
                            variant="outlined"
                            errors={errors.last_name}
                            formStyle={classes.formControl}
                            textFieldStyle={classes.textField}
                            defaultValue={createOrUpdate ? createOrUpdate.last_name : ""}
                        />
                        <TextFieldForm
                            name="CCCD"
                            control={control}
                            label="CCCD"
                            variant="outlined"
                            errors={errors.CCCD}
                            formStyle={classes.formControl}
                            textFieldStyle={classes.textField}
                            defaultValue={createOrUpdate ? createOrUpdate.CCCD : ""}
                        />
                        <TextFieldForm
                            name="email"
                            control={control}
                            label="Email"
                            variant="outlined"
                            //errors={errors.email}
                            formStyle={classes.formControl}
                            textFieldStyle={classes.textField}
                            defaultValue={createOrUpdate ? createOrUpdate.email : ""}
                        />
                        <Controller
                            name="sex"
                            control={control}
                            rules={{ required: true }}
                            defaultValue= {createOrUpdate?.sex ? createOrUpdate?.sex === 1 ? "Male" : "Female" : ""}
                            render={({ field: { value = createOrUpdate.sex, onChange } }) => (
                                <AutocompleteSingle
                                    name="gender"
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    list={genderConstant}
                                    textFieldStyle={classes.inputControl}
                                />
                            )}
                        />
                        {errors.sex && (
                            <p
                                aria-roledescription="error"
                                className={classes.errorInput}
                            >
                                Be required
                            </p>
                        )}
                        <DatePickerForm
                            name="birthday"
                            control={control}
                            defaultValue={createOrUpdate ? createOrUpdate.birthday : new Date()}
                            label="Birthday"
                            formStyle={classes.formControl}
                            errors={errors}
                        />
                    </MuiPickersUtilsProvider>
                    <Button
                        type="submit"
                        className={classes.submitButton}
                        variant="contained"
                        color="primary"
                    >
                        {createOrUpdate ? "Update" : "Add"}
                    </Button>
                </form>
            </ModalInfor>
        );
    };

    const RenderTableRow = (props) => {
        const {
            CCCD,
            first_name,
            last_name,
            image,
            email,
            sex,
            birthday,
        } = props.item || {};

        return (
            <TableRow key={props.index}>
                <TableCell
                    style={{ color: "#111743", fontWeight: "bold" }}
                    align="left"
                >
                    {props.index + 1}
                </TableCell>
                <TableCell align="left">{first_name + " " + last_name}</TableCell>
                <TableCell align="left">
                    <Avatar
                        src={image}
                    ></Avatar>
                </TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{CCCD}</TableCell>
                <TableCell align="left">{sex === 1 ? "Male" : "Female"}</TableCell>
                <TableCell align="left">{birthday}</TableCell>
                <TableCell align="left">
                    <IconButton onClick={() => {
                        onOpenForm(props.item);
                    }}>
                        <Edit />
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    <IconButton onClick={() => openDeleteModal(CCCD)}>
                        <Delete />
                    </IconButton>
                </TableCell>

            </TableRow>
        );
    };

    const RenderEmployee = () => {
        return (
            listOfStudent &&
            listOfStudent.map((item, index) => (
                <RenderTableRow key={index} item={item} index={index} />
            ))
        );
    };

    return (
        <main className={classes.root}>
            <ToastContainer />
            <div style={{ display: "flex", alignItems: "center" }}>
                <div className={classes.right__item_title}>Student list</div>
                <IconButton onClick={() => onOpenForm()}>
                    <AddCircleOutlineOutlined />
                </IconButton>
            </div>
            <Paper elevation={2} className={classes.paper}>
                <TableContainer>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow hover>
                                {tableCell.map((cell) => (
                                    <StyledTableCell align="left">{cell}</StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <RenderEmployee />
                        </TableBody>
                    </Table>
                </TableContainer>
                <ModalConfirm
                    open={openConfirmDelete}
                    handleClose={() => setConfirmDelete(false)}
                    title="Are you sure to delete this student? "
                    handleYes={() => {
                        onDelete(id);
                    }}
                />
            </Paper>
            {createOrUpdate ? <Form createOrUpdate={createOrUpdate} /> : <Form />}
        </main>
    )
}
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#d8d8d8",
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: "4.5rem",
        padding: ".5rem",
    },
    paper: {
        padding: 24,
        width: "100%",
        height: "78vh",
        margin: "auto",
        overflow: "auto"
    },
    submitButton: {
        marginTop: "1.5rem",
    },
    left__avt: {
        position: "relative",
        marginRight: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "1rem 0rem"
    },
    buttonAvatar: {
        "&:hover": {
            fontSize: 16,
            backgroundColor: "#dbdbdb",
            opacity: 0.5,
        },
    },
    avtStyle: {
        margin: "auto",
        width: 80,
        height: 80,
        zIndex: 0,
        boxShadow: theme.shadows[4],
    },
    iconStyle: {
        zIndex: 1,
        position: "absolute",
        //right: 70,
        bottom: -20
    },
    formControl: {
        width: 380,
        paddingBottom: 5,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textField: {
        height: 38,
        borderRadius: 3,
    }
}))