import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const fetchProducts = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

const Products = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  const filteredProducts = data?.filter((product) => {
    return (
      (category ? product.category === category : true) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.rating >= rating
    );
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="home">Home</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-[200px]">
          <label className="block mb-2">Price Range</label>
          <Slider
            defaultValue={priceRange}
            max={1000}
            step={10}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <div className="w-[200px]">
          <label className="block mb-2">Rating</label>
          <Slider
            defaultValue={[rating]}
            max={5}
            step={0.5}
            onValueChange={(value) => setRating(value[0])}
          />
          <div className="flex justify-between">
            <span>{rating} Stars</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <p className="text-lg font-semibold">${product.price}</p>
            </CardContent>
            <CardFooter>
              <Button as={Link} to={`/products/${product.id}`} className="mr-2">
                View Details
              </Button>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;