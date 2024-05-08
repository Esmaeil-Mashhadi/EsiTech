import { CancelButton, SubmitButton } from '../../constants/buttons/Button';
import styles from './Terms.module.css'
import {  TermPropType } from './types/authtypes';





const Terms = ({setTerms , formData , setFormData}:TermPropType) => {
    const acceptHandler = ()=>{
          setTerms(false)
          setFormData({...formData , check: true})
    }

    const cancelHanlder = ()=>{
        setTerms(false)
        setFormData({...formData , check :false})
    }
    return (
        <div className={styles.container}>
           <h2>
                 Terms and Conditions:
           </h2>

             <div>
               <h3>Product Information:</h3>

               <p>
                 The information provided on our website regarding the PC parts, including specifications, prices, and availability, is subject to change without prior notice.
                  We strive to ensure accurate and up-to-date information, but we cannot guarantee the completeness or accuracy of the product details at all times.
                </p>
                
             </div>

             <div>
               <h3>Ordering and Payment: </h3>

               <p>
                   By placing an order on our website, you agree to provide accurate and complete information required for the purchase process.
                   All prices listed on the website are in the specified currency and exclude any applicable taxes or shipping charges.
                   Payment methods accepted will be clearly indicated during the checkout process.
                </p>

             </div>
    
             <div>
             
                 <h3>Shipping and Delivery:</h3>
                  <p>
                      We will make reasonable efforts to ship the ordered products within the specified time frame.
                      Shipping costs, estimated delivery times, and available shipping methods will be displayed during the checkout process.
                      Any delays or issues with shipping and delivery that are beyond our control will be communicated promptly to the customer.
                 </p>
             
             </div>
            

            <div>
              <h3>  Returns and Refunds:</h3>
              <p>
              If you receive a defective or damaged product, please contact our customer support within 3 days of receiving the item to initiate the return process.
              Returns and exchanges are subject to our Return Policy, which outlines the conditions and procedures for returning products.
              Refunds will be processed in accordance with our Refund Policy, taking into consideration any applicable fees or deductions.
              </p>
            </div>
            
            <div>
             <h3> Intellectual Property:</h3>
                <p> 
                The content and images on our website are protected by copyright and other intellectual property laws.
                You may not reproduce, distribute, or use any of the website's content without obtaining prior written permission from us.
                 </p>
            </div>
           
            
            <div>
              <h3> Limitation of Liability:</h3>
              <p>
                We shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our website or products.
                Our liability, in any case, shall be limited to the amount paid by the customer for the specific product or service in question.
              </p>
            </div>
           
            <div className={styles.buttonContainer}>
              <SubmitButton text='Accept' handler={acceptHandler} />
              <CancelButton text='Decline' handler={cancelHanlder} />
            </div>

        </div>
    );
};

export default Terms;

/**
 * 
 */