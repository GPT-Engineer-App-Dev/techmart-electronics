import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchProduct = async (id) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
};

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={data.image} alt={data.name} className="w-full h-64 object-cover mb-4" />
        <p className="text-lg font-semibold">${data.price}</p>
        <p className="mt-4">{data.description}</p>
        <Button className="mt-4">Add to Cart</Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;