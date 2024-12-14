// src/components/UserProfile.js
// In Profile Component
const Profile = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <h3>Orders</h3>
      {user.orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {user.orders.map((order, index) => (
            <li key={index}>
              <p>Order Date: {order.date}</p>
              <p>Items: {order.items.map(item => item.name).join(", ")}</p>
              <p>Discount Applied: ${order.discount5Percent}</p>
              <p>Total: ${order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
