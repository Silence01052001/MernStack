import React, {Fragment, useEffect} from 'react'
import {DataGrid} from "@material-ui/data-grid"
import {useSelector, useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import MetaData from "../layout/MetaData"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import SideBar from "./Sidebar"
import { getAllUsers, clearErrors, deleteUser } from '../../actions/userAction'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UsersList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert()
  const {error,  users} = useSelector(state=>state.allUsers)

  const {error: deleteError, isDeleted} = useSelector(state=>state.profile)
  
  const deleteUserHandler = (id) =>{
    dispatch(deleteUser(id));
  }

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors())
    }

    if(isDeleted){
      alert.success("XÓA TÀI KHOẢN THÀNH CÔNG")
      navigate("/admin/users")
      dispatch({type: DELETE_USER_RESET})
    }

    dispatch(getAllUsers())
  }, [dispatch, alert, error, deleteError, navigate, isDeleted])

  const columns = [
    {
      field: "id",
      headerName: "MÃ NGƯỜI DÙNG",
      minWidth: 150,
      flex:0.2
    },
    {
      field:"name",
      headerName: "TÊN",
      minWidth: 100,
      flex:0.1
    },
    {
      field: "email",
      headerName: "EMAIL",
      minWidth: 150,
      flex: 0.2
    },
    {
      field: "role",
      headerName: "QUYỀN",
      minWidth: 100,
      type: "number",
      flex: 0.1,
      cellClassName:(params)=>{
        return (
          params.getValue(params.id, "role")==="admin" ? "greenColor" : "redColor"
        )
      }
    },
    {
      field: "actions",
      flex:0.1,
      headerName: "THAO TÁC",
      minWidth:100,
      type: "number",
      sortable: false,
      renderCell:(params)=>{
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
              <EditIcon/>
            </Link>

            <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    }
  ]

  const rows=[];

  users && 
  users.forEach(item=>{
      rows.push({
        id:item._id,
        name: item.name,
        email:item.email,
        role: item.role,
      })
    })
  return (
    <Fragment>
      <MetaData title={`Tất cả tài khoản - ADMIN`}/>

      <div className='dashboard'>
        <SideBar />
        <div className='productListContainer'>
          <h1 id='productListHeading'>TẤT CẢ TÀI KHOẢN</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
            />
        </div>
      </div>
    </Fragment>
  )
}

export default UsersList;