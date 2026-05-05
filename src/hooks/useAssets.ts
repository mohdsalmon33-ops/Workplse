import { useState, useCallback } from 'react';
import { Asset, AssetStatus } from '../types';

const INITIAL_ASSETS: Asset[] = [
  { id: 'AST-001', name: 'Mainframe Cooling Unit', category: 'HARDWARE', status: 'OPERATIONAL' },
  { id: 'AST-002', name: 'Recon Rover Alpha', category: 'VEHICLE', status: 'MAINTENANCE', assignedTo: 'WRK-4291' },
  { id: 'AST-003', name: 'Quantum Key Distribution Node', category: 'TERMINAL', status: 'OFFLINE' },
  { id: 'AST-004', name: 'Perimeter Defense Turret 12', category: 'WEAPONRY', status: 'OPERATIONAL' },
  { id: 'AST-005', name: 'Comm Relay Backhaul', category: 'HARDWARE', status: 'OPERATIONAL' },
];

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);

  const updateAssetStatus = useCallback((id: string, status: AssetStatus) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  }, []);

  const addAsset = useCallback((asset: Omit<Asset, 'id'>) => {
    const newId = `AST-${Math.floor(100 + Math.random() * 900)}`;
    setAssets(prev => [...prev, { ...asset, id: newId }]);
  }, []);

  return { assets, updateAssetStatus, addAsset };
}
