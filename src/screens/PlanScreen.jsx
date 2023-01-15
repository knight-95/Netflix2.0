import { loadStripe } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import "./PlanScreen.css";

const PlanScreen = () => {
  const [products, setProducts] = useState([]);

  //   pulling from Redux
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

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

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Shows an error to your customer and
        // inspect your Cloud Function logs in the Firebase console
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // Now we have a session, so let's redirect to checkout
        // Initialize Stripe

        // const stripe = await loadStripe(
        //   "pk_live_51MQ298SCi4QcPJKMe0BymGtl6GhTQw27JvGarf5BApM1b1Jgff0SXu2tufMnTEMeIyX33Nyxrhvlj4Dw5gB2KBRg00xYHFaVB2"
        // );

        const stripe = await loadStripe(
          "pk_test_51MQ298SCi4QcPJKMabdB5Uaf8FRpDRBESqGZ54Nu01B4gZpQjAgVLVQWamEA3KNjPd82klwHvDN7fBQGnFXtxlG000sx1N65Kg"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(subscription?.current_period_end * 1000).toLocaleDateString}
        </p>
      )}
      {/* Mapping through object */}

      {Object.entries(products).map(([productId, productData]) => {
        // Logic to check if user's subscription is active...

        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        // const isCurrentPackage = true;

        return (
          <div
            key={productId}
            className="planScreen__plan"
            // className={`${
            //   isCurrentPackage && "planScreen__plan--disabled"
            // } plansScreen__plan`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
              
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlanScreen;
