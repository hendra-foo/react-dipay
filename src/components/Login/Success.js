import React from 'react'
import rootStyle from '../../dipay.module.scss'
import styles from './login.module.scss'
import { Check } from '../icons'

const Success = ({ onClick }) => (
  <div>
    <div className={rootStyle.checkIcon}>
      <Check />
    </div>
    <h2 className={rootStyle.modalTitle}>Akun berhasil dihubungkan</h2>
    <p className={styles.helperText}>Nikmati pembayaran yang lebih mudah dan berbagai penawaran lainnya</p>
    <button onClick={onClick} className={`${rootStyle.btn} ${rootStyle.btnPrimary} ${styles.btnActivate}`}>Tutup</button>
  </div>
)

export default Success
