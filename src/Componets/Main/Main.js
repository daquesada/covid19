import React from "react";
import { Card } from "../Card/Card";
import Table from "../Table/Table";
import { useCountry } from "../../Hooks/useCountry";
import Loading from "../Loading/Loading";
import "./styles.css";

export default function Main() {
  const { getStats, loading } = useCountry();

  if (loading) {
    return (
      <div className="mx-auto mt-auto text-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col col-md-4 mt-3 ">
          {/* #e9ec1e */}
          <Card
            className="hover-card"
            title="Confirmed"
            color="#fa983a"
            number={new Intl.NumberFormat().format(getStats().confirmed)}
          />
        </div>
        <div className="col-md-4 mt-3 ">
          <Card
            className="hover-card"
            title="Recovered"
            color="#4cff16"
            number={new Intl.NumberFormat().format(getStats().recovered)}
          />
        </div>
        <div className="col-md-4 mt-3">
          <Card
            className="hover-card"
            title="Deaths"
            color="#ff3b3b"
            number={new Intl.NumberFormat().format(getStats().deaths)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Card title={"Reported cases by country"}>
            <Table />
          </Card>
        </div>
      </div>
    </div>
  );
}
