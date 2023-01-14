import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlanScreen.css";

const PlanScreen = () => {
  const [products, setProducts] = useState([]);

  //   pulling from Redux
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  console.log(products);

  const loadCheckout = async (priceId) => {

    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      docRef.onSnapshot(async(snap) => {
        const {error , sessionId } = snap.data();

        if(error){
            // Shows an error to your customer and
            // inspect your Cloud Function logs in the Firebase console
            alert(`An error occured: ${error.message}`);
        }

        if(sessionId){
            // Now we have a session, so let's redirect to checkout
            
        }
      });
  };

  return (
    <div className="plansScreen">
      {/* Mapping through object */}

      {Object.entries(products).map(([productId, productData]) => {
        {
          /* Logic to check if user's subscription is active... */
        }

        return (
          <div className="planScreen__plan">
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
