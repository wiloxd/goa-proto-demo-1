/* A list of applications, used by the Applications page and by search. It
 * uses the table-sizing wrapper so every list has the same row heights. */

import { Link } from "react-router-dom";
import { GoabBadge, GoabTable } from "@abgov/react-components";
import { statusBadge, type SampleApplication } from "../data/sample";
import { workTypes } from "../shared/copyright";
import { formatDate } from "../shared/formatDate";

export function applicationPath(id: string) {
  return `/internal/applications/${id}`;
}

export function ApplicationsTable({ rows }: { rows: SampleApplication[] }) {
  return (
    <div className="table--list-sizing applications-table">
      <GoabTable width="100%">
        <thead>
          <tr>
            <th>Status</th>
            <th>Reference</th>
            <th>Title</th>
            <th>Type of work</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="goa-table-cell--badge">
                <GoabBadge
                  type={statusBadge[row.status]}
                  content={row.status}
                  icon={false}
                />
              </td>
              <td className="nowrap">
                <Link to={applicationPath(row.id)}>{row.id}</Link>
              </td>
              <td>{row.title}</td>
              <td>{workTypes[row.typeOfWork].label}</td>
              <td className="nowrap">{formatDate(row.submitted)}</td>
            </tr>
          ))}
        </tbody>
      </GoabTable>
    </div>
  );
}
