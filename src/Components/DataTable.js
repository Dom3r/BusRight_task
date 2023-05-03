import React, { useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./DataTable.css";

const DataTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        dataField: "districtName",
        text: "District Name ",
        filter: textFilter(),
      },
      { dataField: "districtId", text: "District ID ", filter: textFilter() },
      { dataField: "schoolId", text: "School ID ", filter: textFilter() },
      { dataField: "routeName", text: "Route Name ", filter: textFilter() },
      { dataField: "routeId", text: "Route ID ", filter: textFilter() },
      {
        dataField: "routeScheduleType",
        text: "Route Schedule Type ",
        filter: textFilter(),
      },
      { dataField: "sessionId", text: "Session ID", filter: textFilter() },
      { dataField: "driverName", text: "Driver Name ", filter: textFilter() },
      {
        dataField: "sessionDuration",
        text: "Session Duration ",
        filter: textFilter(),
      },
      {
        dataField: "sessionStart",
        text: "Session Start ",
        filter: textFilter(),
      },
      { dataField: "sessionEnd", text: "Session End ", filter: textFilter() },
      { dataField: "totalStops", text: "Total Stops ", filter: textFilter() },
      {
        dataField: "totalComplete",
        text: "Total Complete ",
        filter: textFilter(),
      },
      {
        dataField: "totalSkipped",
        text: "Total Skipped ",
        filter: textFilter(),
      },
      {
        dataField: "percentAddressed",
        text: "% Addressed ",
        filter: textFilter(),
      },
      {
        dataField: "totalIncomplete",
        text: "Total Incomplete ",
        filter: textFilter(),
      },
      {
        dataField: "percentIncomplete",
        text: "% Incomplete ",
        filter: textFilter(),
      },
      {
        dataField: "totalReroutes",
        text: "Total Reroutes ",
        filter: textFilter(),
      },
      {
        dataField: "deactivationReason",
        text: "Deactivation Reason ",
        filter: textFilter(),
      },
    ],
    []
  );

  const defaultSorted = [{ dataField: "districtName", order: "asc" }];

  return (
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      filter={filterFactory()}
      defaultSorted={defaultSorted}
    />
  );
};

export default DataTable;
