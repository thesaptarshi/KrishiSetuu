// Firebase service functions for data operations
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore"
import { db } from "./firebase-config.js"

// Farmers operations
export const farmersService = {
  // Add new farmer
  async addFarmer(farmerData) {
    try {
      const docRef = await addDoc(collection(db, "farmers"), {
        ...farmerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { id: docRef.id, ...farmerData }
    } catch (error) {
      console.error("Error adding farmer:", error)
      throw error
    }
  },

  // Get all farmers
  async getAllFarmers() {
    try {
      const querySnapshot = await getDocs(collection(db, "farmers"))
      const farmers = []
      querySnapshot.forEach((doc) => {
        farmers.push({ id: doc.id, ...doc.data() })
      })
      return farmers
    } catch (error) {
      console.error("Error getting farmers:", error)
      throw error
    }
  },

  // Update farmer
  async updateFarmer(farmerId, updateData) {
    try {
      const farmerRef = doc(db, "farmers", farmerId)
      await updateDoc(farmerRef, {
        ...updateData,
        updatedAt: new Date(),
      })
      return true
    } catch (error) {
      console.error("Error updating farmer:", error)
      throw error
    }
  },

  // Delete farmer
  async deleteFarmer(farmerId) {
    try {
      await deleteDoc(doc(db, "farmers", farmerId))
      return true
    } catch (error) {
      console.error("Error deleting farmer:", error)
      throw error
    }
  },

  // Listen to farmers changes (real-time)
  onFarmersChange(callback) {
    return onSnapshot(collection(db, "farmers"), (snapshot) => {
      const farmers = []
      snapshot.forEach((doc) => {
        farmers.push({ id: doc.id, ...doc.data() })
      })
      callback(farmers)
    })
  },
}

// Companies operations
export const companiesService = {
  // Add new company
  async addCompany(companyData) {
    try {
      const docRef = await addDoc(collection(db, "companies"), {
        ...companyData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { id: docRef.id, ...companyData }
    } catch (error) {
      console.error("Error adding company:", error)
      throw error
    }
  },

  // Get all companies
  async getAllCompanies() {
    try {
      const querySnapshot = await getDocs(collection(db, "companies"))
      const companies = []
      querySnapshot.forEach((doc) => {
        companies.push({ id: doc.id, ...doc.data() })
      })
      return companies
    } catch (error) {
      console.error("Error getting companies:", error)
      throw error
    }
  },

  // Update company
  async updateCompany(companyId, updateData) {
    try {
      const companyRef = doc(db, "companies", companyId)
      await updateDoc(companyRef, {
        ...updateData,
        updatedAt: new Date(),
      })
      return true
    } catch (error) {
      console.error("Error updating company:", error)
      throw error
    }
  },

  // Delete company
  async deleteCompany(companyId) {
    try {
      await deleteDoc(doc(db, "companies", companyId))
      return true
    } catch (error) {
      console.error("Error deleting company:", error)
      throw error
    }
  },

  // Listen to companies changes
  onCompaniesChange(callback) {
    return onSnapshot(collection(db, "companies"), (snapshot) => {
      const companies = []
      snapshot.forEach((doc) => {
        companies.push({ id: doc.id, ...doc.data() })
      })
      callback(companies)
    })
  },
}

// Orders operations
export const ordersService = {
  // Add new order
  async addOrder(orderData) {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        ...orderData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { id: docRef.id, ...orderData }
    } catch (error) {
      console.error("Error adding order:", error)
      throw error
    }
  },

  // Get all orders
  async getAllOrders() {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      return orders
    } catch (error) {
      console.error("Error getting orders:", error)
      throw error
    }
  },

  // Update order
  async updateOrder(orderId, updateData) {
    try {
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, {
        ...updateData,
        updatedAt: new Date(),
      })
      return true
    } catch (error) {
      console.error("Error updating order:", error)
      throw error
    }
  },

  // Delete order
  async deleteOrder(orderId) {
    try {
      await deleteDoc(doc(db, "orders", orderId))
      return true
    } catch (error) {
      console.error("Error deleting order:", error)
      throw error
    }
  },

  // Get orders by status
  async getOrdersByStatus(status) {
    try {
      const q = query(collection(db, "orders"), where("status", "==", status), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const orders = []
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      return orders
    } catch (error) {
      console.error("Error getting orders by status:", error)
      throw error
    }
  },

  // Listen to orders changes
  onOrdersChange(callback) {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
    return onSnapshot(q, (snapshot) => {
      const orders = []
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() })
      })
      callback(orders)
    })
  },
}

// Payments operations
export const paymentsService = {
  // Add payment
  async addPayment(paymentData) {
    try {
      const docRef = await addDoc(collection(db, "payments"), {
        ...paymentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { id: docRef.id, ...paymentData }
    } catch (error) {
      console.error("Error adding payment:", error)
      throw error
    }
  },

  // Get payments by farmer ID
  async getPaymentsByFarmer(farmerId) {
    try {
      const q = query(collection(db, "payments"), where("farmerId", "==", farmerId), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const payments = []
      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() })
      })
      return payments
    } catch (error) {
      console.error("Error getting payments:", error)
      throw error
    }
  },

  // Get all payments
  async getAllPayments() {
    try {
      const q = query(collection(db, "payments"), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const payments = []
      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() })
      })
      return payments
    } catch (error) {
      console.error("Error getting all payments:", error)
      throw error
    }
  },
}

// Admin prices operations
export const adminPricesService = {
  // Set admin price
  async setAdminPrice(product, price) {
    try {
      const priceRef = doc(db, "adminPrices", product)
      await updateDoc(priceRef, {
        price: price,
        updatedAt: new Date(),
      })
      return true
    } catch (error) {
      // If document doesn't exist, create it
      try {
        await addDoc(collection(db, "adminPrices"), {
          product: product,
          price: price,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        return true
      } catch (createError) {
        console.error("Error setting admin price:", createError)
        throw createError
      }
    }
  },

  // Get all admin prices
  async getAllAdminPrices() {
    try {
      const querySnapshot = await getDocs(collection(db, "adminPrices"))
      const prices = {}
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        prices[data.product] = data.price
      })
      return prices
    } catch (error) {
      console.error("Error getting admin prices:", error)
      throw error
    }
  },
}
