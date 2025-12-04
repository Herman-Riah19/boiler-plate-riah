'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { 
  FileText, 
  Wallet, 
  Building2, 
  FileText as FileIcon,
  TrendingUp,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { name: 'Contrats actifs', value: '12', icon: FileText, color: 'bg-blue-500' },
    { name: 'Wallets', value: '8', icon: Wallet, color: 'bg-green-500' },
    { name: 'Organisations', value: '3', icon: Building2, color: 'bg-purple-500' },
    { name: 'Transactions', value: '156', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const quickActions = [
    { name: 'Créer un contrat', href: '/dashboard/contracts', icon: FileText },
    { name: 'Ajouter un wallet', href: '/dashboard/wallets', icon: Wallet },
    { name: 'Nouvelle organisation', href: '/dashboard/organizations', icon: Building2 },
    { name: 'Uploader un fichier', href: '/dashboard/files', icon: FileIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue sur votre plateforme de gestion blockchain</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.name} href={action.href}>
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Icon className="h-6 w-6" />
                    <span className="text-sm">{action.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nouveau contrat déployé</p>
                  <p className="text-sm text-gray-500">Il y a 2 heures</p>
                </div>
                <Badge variant="secondary">Contrat</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transaction confirmée</p>
                  <p className="text-sm text-gray-500">Il y a 4 heures</p>
                </div>
                <Badge variant="secondary">Transaction</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nouveau membre ajouté</p>
                  <p className="text-sm text-gray-500">Il y a 6 heures</p>
                </div>
                <Badge variant="secondary">Organisation</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Transactions ce mois</span>
                <span className="font-medium">+23%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nouveaux contrats</span>
                <span className="font-medium">+15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Utilisateurs actifs</span>
                <span className="font-medium">+8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Stockage utilisé</span>
                <span className="font-medium">2.3 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}