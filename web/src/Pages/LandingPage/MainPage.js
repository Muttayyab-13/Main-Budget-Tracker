import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../LandingPage/MainPage.css";
import AddBudgetCard from "../../Components/AddBudgetCard/AddBudgetCard.js";
import { useState, useEffect, useRef } from "react";
import BarChart from "../../Components/BarChart.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BudgetTracker = () => {
  const [tableData, setTableData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [totalBudget, setTotalBudget] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", price: "", date: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [originalData, setOriginalData] = useState([]);

  const handleBudgetData = (data) => {
    const newData = [...tableData, data];
    setTableData(newData);
    setOriginalData(newData);
    handleClose();
  };

  useEffect(() => {
    const savedUserData = localStorage.getItem("user");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setTotalBudget(parsedData.budgetLimit);
      const totalExpense = tableData.reduce(
        (acc, item) => acc + Number(item.price),
        0
      );
      if (parsedData.budgetLimit <= totalExpense) {
        setIsDisabled(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tableData, totalBudget]);

  const findRemainingBudget = () => {
    const totalExpense = tableData.reduce(
      (acc, item) => acc + Number(item.price),
      0
    );
    return totalBudget - totalExpense;
  };

  const handleEdit = (index) => {
    const itemToEdit = tableData[index];
    setEditData(itemToEdit);
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTableData = [...tableData];
    updatedTableData[editIndex] = editData;
    setTableData(updatedTableData);
    setIsEditing(false);
    setEditIndex(null);
  };

  const toggleMenu = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
    setOriginalData(updatedData);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filterRecords = () => {
    if (filterDate) {
      const filteredData = originalData.filter(
        (item) => item.date === filterDate
      );
      setTableData(filteredData);
    } else {
      // Reset to show all data
      setTableData(originalData);
    }
  };
  const [value, setValue] = useState(7);

  const handleMonthChange = () => {
    setValue(30);
  };

  const handleweekChange = () => {
    setValue(7);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  // Calculate the index range of the current page
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentData = tableData.slice(startIdx, endIdx);

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="bod">
        <div className="budget-tracker">
          <div className="content">
            <div className="filter-container">
              <div className="filter">
                <div className="dateFilter">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={filterDate}
                    onChange={handleDateChange}
                  />
                </div>
                <button className="filter-button" onClick={filterRecords}>
                  Filter Records
                </button>
              </div>
              <button
                className="add-budget-button"
                onClick={handleOpen}
                disabled={isDisabled}
              >
                Add Budget
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <AddBudgetCard
                    onSubmit={handleBudgetData}
                    remainBudget={findRemainingBudget()}
                  />
                </Box>
              </Modal>
            </div>
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.date}</td>
                    <td>
                      <div className="actions-container" ref={menuRef}>
                        <button
                          className="actions-button"
                          onClick={() => toggleMenu(index)}
                        >
                          ...
                        </button>

                        {activeMenu === index && (
                          <div className="dropdown-menu">
                            <button
                              onClick={() => {
                                handleEdit(index);
                                setActiveMenu(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                handleDelete(index);
                                setActiveMenu(null);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isEditing && (
              <div className="edit-form-container">
                <form onSubmit={handleEditSubmit}>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label>
                    Date:
                    <input
                      type="date"
                      name="date"
                      value={editData.date}
                      onChange={handleEditChange}
                    />
                  </label>
                  <button type="submit">Save Changes</button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setActiveMenu(null);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
            {/* <div className="footer">
              <div className="budgetAnalysis">
                <div >
                <h4 className="budgetBox" id="total">
                  Total Budget : <span id="totalHead">Rs.{totalBudget}</span>
                </h4>  
                </div>
                <div >
                  <h4 className="budgetBox">
                  Remaining Budget :{" "}
                  <span id="remain">Rs.{findRemainingBudget()}</span>
                </h4>
                </div>
                
              </div>*/}

            <div className="pagination">
              <span>Rows per page: </span>
              <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
              <span>
                {startIdx + 1}–{Math.min(endIdx, tableData.length)} of{" "}
                {tableData.length}
              </span>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ❮
              </button>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ❯
              </button>
            </div>
            {/* </div>  */}
          </div>
        </div>
        <div className="barChart">
          <h3>Budget Analytics</h3>

          <div className="trends">
            <div className="last" onClick={handleweekChange}>
              <span>Last Week</span>
            </div>
            <div className="last" onClick={handleMonthChange}>
              <span>Last Month</span>
            </div>
          </div>
          <h5>Budget Trends</h5>
          <div className="barChart-chart">
            <BarChart budgetEntries={tableData} time={value} />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default BudgetTracker;
