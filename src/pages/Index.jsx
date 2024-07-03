import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to ElectroMart</h1>
      <p className="text-lg mb-8">Your one-stop shop for all electronic needs.</p>
      <Button onClick={() => navigate("/products")} className="text-lg">
        Shop Now
      </Button>
    </div>
  );
};

export default Index;