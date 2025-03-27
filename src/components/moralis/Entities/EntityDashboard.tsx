import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";

const EntityDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [entity, setEntity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function fetchEntityDetails() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/entities/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch entity details");
        }
        const data = await response.json();
        setEntity(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching entity details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEntityDetails();
  }, [id]);

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!entity) return <div>No entity found.</div>;

  return (
    <div className="page container">
      <button
        className="btn btn-sm btn-outline portfolio-back"
        onClick={goBack}
      >
        Back
      </button>
      <div className="entity-header">
        <img src={entity.logo} alt={`${entity.name} logo`} />
        <div>
          <h1>
            {entity.name} <span className="entity-type">{entity.type}</span>
          </h1>
          <p>{entity.bio}</p>
        </div>
      </div>
      {/* Additional content goes here */}
    </div>
  );
};

export default EntityDashboard;
